import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { FirebaseBDDService } from './firebase-bdd.service';
import { Postulante } from '../models/postulante';
import { Empresa } from '../models/empresa';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  rolActual: string;
  foto: string;
  empresa: Empresa;
  postulante: Postulante;

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private firebaseBDDService: FirebaseBDDService
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        this.consultarUsuario();
      } else {
        this.userDetails = null;
        this.rolActual = null;
      }
    });
  }

  public obtenerUsuario(): any {
    if (this.isLoggedIn()) {
      return null;
    }

    if (!this.empresa) {
      return this.postulante;
    }
    return this.empresa;
  }

  private consultarUsuario() {
    this.rolActual = null;

    this.firebaseBDDService.firebaseControllerEmpresas
      .querySimple('correoElectronico', this.userDetails.email)
      .snapshotChanges()
      .subscribe(empresas => {
        if (empresas.length > 0) {
          this.rolActual = 'e';
          empresas.forEach(item => {
            this.empresa = item.payload.val() as Empresa;
            this.foto = this.empresa.fotografia;
            return;
          });
          return;
        }

        this.firebaseBDDService.firebaseControllerPostulantes
          .querySimple('correoElectronico', this.userDetails.email)
          .snapshotChanges()
          .subscribe(postulantes => {
            if (postulantes.length > 0) {
              this.rolActual = 'p';
              postulantes.forEach(item => {
                this.postulante = item.payload.val() as Postulante;
                this.foto = this.postulante.fotografia;
                return;
              });
              return;
            }
          });
      });
  }

  rol(): string {
    return this.rolActual;
  }

  fotografia(): string {
    return this.foto;
  }

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  signInRegular(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(['/']));
  }

  actualizarPerfil(displayName, photoURL) {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
      .then(function() {
        // Update successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  getASecureRandomPassword(): string {
    const min = 111111111;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  actualizarContrasena() {
    const user = this._firebaseAuth.auth.currentUser;
    const newPassword = this.getASecureRandomPassword();

    user
      .updatePassword(newPassword)
      .then(function() {
        // Update successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  reinicioClaveEnvioCorreo(emailAddress, idioma) {
    const auth = this._firebaseAuth.auth;
    if (!idioma) {
      idioma = 'es';
    }

    this._firebaseAuth.auth.languageCode = idioma;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function() {
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  displayNameOrEmail(): string {
    if (this.userDetails) {
      if (this.userDetails.displayName) {
        return this.userDetails.displayName;
      }
      if (this.userDetails.email) {
        return this.userDetails.email;
      }
      return '¡Sin nombre!';
    }
    return 'Anónimo';
  }
}
