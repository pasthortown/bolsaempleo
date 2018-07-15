import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  email: string;
  clave: string;
  datosConfirmados: Boolean;


  constructor(public router: Router) { }

  ngOnInit() {
    this.datosConfirmados = true;
  }

  ingresar() {
  }

  recuperarClave() {
  }
}
