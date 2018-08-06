import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { FirebaseBDDService } from './firebase-bdd.service';
import { Postulante } from '../models/postulante';
import { Empresa } from '../models/empresa';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  rolActual: string;
  usuarioNegocio: any;

  constructor(
    private _firebaseAuth: AngularFireAuth,
    private router: Router,
    private firebaseBDDService: FirebaseBDDService
  ) {
    this.usuarioNegocio = new Postulante();
    this.usuarioNegocio.fotografia = 'assets/img/user.png';
    this.rolActual = 'ns';
    this.user = _firebaseAuth.authState;
  }

  public obtenerUsuario(): any {
    if (!this.isLoggedIn() || !this.usuarioNegocio) {
      return null;
    }
    return this.usuarioNegocio;
  }

  private consultarUsuario(email) {
    this.rolActual = null;

    this.firebaseBDDService.firebaseControllerEmpresas
      .filtroExacto('correoElectronico', email)
      .snapshotChanges()
      .subscribe(empresas => {
        if (empresas.length > 0) {
          this.rolActual = 'e';
          empresas.forEach(item => {
            this.usuarioNegocio = item.payload.val() as Empresa;
            this.usuarioNegocio.id = item.key;
            if (this.usuarioNegocio.fotografia == null) {
              this.usuarioNegocio.fotografia = 'assets/img/user.png';
            }
            this.router.navigate(['postulantes']);
            return;
          });
          return;
        }

        this.firebaseBDDService.firebaseControllerPostulantes
          .filtroExacto('correoElectronico', this.userDetails.email)
          .snapshotChanges()
          .subscribe(postulantes => {
            if (postulantes.length > 0) {
              this.rolActual = 'p';
              postulantes.forEach(item => {
                this.usuarioNegocio = item.payload.val() as Postulante;
                this.usuarioNegocio.id = item.key;
                if (this.usuarioNegocio.fotografia == null) {
                  this.usuarioNegocio.fotografia = 'assets/img/user.png';
                }
                this.router.navigate(['empresas']);
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
    if (!this.usuarioNegocio) {
      return null;
    }
    return this.usuarioNegocio.fotografia;
  }

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  signInRegular(email, password) {
    return this._firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.user.subscribe(user => {
          if (user) {
            this.userDetails = user;
            this.consultarUsuario(this.userDetails.email);
          } else {
            this.userDetails = null;
            this.rolActual = null;
          }
        });
      });
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.usuarioNegocio = new Postulante();
    this.usuarioNegocio.fotografia = 'assets/img/user.png';
    this.rolActual = 'ns';
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
      return 'Usuario Anónimo';
    }
    return 'Sesión no Iniciada';
  }
}
