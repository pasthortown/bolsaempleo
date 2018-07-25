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
  usuarioNegocio: any;

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
    if (!this.isLoggedIn() || !this.usuarioNegocio) {
      return null;
    }
    return this.usuarioNegocio;
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
            this.usuarioNegocio = item.payload.val() as Empresa;
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
                this.usuarioNegocio = item.payload.val() as Postulante;
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

  reinicioClaveEnvioCorreo(emailAddress, idioma): Promise<void> {
    const auth = this._firebaseAuth.auth;
    if (!idioma) {
      idioma = 'es';
    }

    this._firebaseAuth.auth.languageCode = idioma;
    return auth.sendPasswordResetEmail(emailAddress);
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
