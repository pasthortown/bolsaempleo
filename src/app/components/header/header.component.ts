import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirebaseBDDService } from '../../services/firebase-bdd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nameOrEmail = '';
  estaLogueado = false;
  rol = '';
  fotoPerfil;

  constructor(public router: Router,
    private authService: AuthService) { }

  ngOnInit() {

  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/postulantes']);
  }
}
