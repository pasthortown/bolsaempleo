import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  private elUsuarioFuente = new Subject<firebase.User>();
  elUsuario$ = this.elUsuarioFuente.asObservable();

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;

          this.elUsuarioFuente.next(user);

          console.log(this.userDetails);
        } else {
          this.userDetails = null;

          this.elUsuarioFuente.next(null);
        }
      }
    );
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

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
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
}
