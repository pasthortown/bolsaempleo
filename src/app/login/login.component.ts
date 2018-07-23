import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  usuario: firebase.User;
  mostrarMensajeError = false;

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        this.router.navigate(['postulantes']);
      })
      .catch((err) => {
        // TODO :
        alert('Se produjo un error al validar las cedenciales');
        console.log('error: ' + err);
      });
  }
}
