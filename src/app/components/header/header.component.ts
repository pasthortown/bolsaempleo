import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { PostulanteService } from '../../services/postulante.service';
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
    public authService: AuthService,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.nameOrEmail = this.authService.displayNameOrEmail();
      if (user) {
        this.estaLogueado = true;
        this.rol = this.authService.rol();
        this.fotoPerfil = JSON.parse(localStorage.getItem('usuarioNegocio')).fotografia;
        return;
      }
      this.estaLogueado = false;
      this.fotoPerfil = 'assets/img/user.png';
    });
  }

  registrarse(tipo: string) {
    this.router.navigate(['/register']);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
