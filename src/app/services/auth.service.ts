import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  createUserWithEmailAndPassword(email, password): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
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
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  actualizarPerfil(displayName, photoURL) {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  getASecureRandomPassword(): string {
    const min = 111111111;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  actualizarContrasena() {
    const user = firebase.auth().currentUser;
    const newPassword = this.getASecureRandomPassword();

    user.updatePassword(newPassword).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  reinicioClaveEnvioCorreo(emailAddress, idioma) {
    const auth = firebase.auth();
    if (!idioma) {
      idioma = 'es';
    }

    firebase.auth().languageCode = idioma;
    auth.sendPasswordResetEmail(emailAddress).then(function () {
      // Email sent.
    }).catch(function (error) {
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
