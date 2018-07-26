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
    public authService: AuthService) { }

  ngOnInit() {
    this.fotoPerfil = 'assets/img/user.png';
    this.authService.user.subscribe(user => {
      this.nameOrEmail = this.authService.displayNameOrEmail();
      if (user) {
        this.estaLogueado = true;
        this.rol = this.authService.rol();
        this.fotoPerfil = JSON.parse(localStorage.getItem('usuarioNegocio')).fotografia;
        return;
      }
      this.estaLogueado = false;
    });
  }

  cerrarSesion() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/postulantes']);
  }
}
