import { Postulante } from './../models/postulante';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  postulante: Postulante;

  constructor() {
    this.postulante = JSON.parse(localStorage.getItem('usuarioNegocio')) as Postulante;
    console.log(this.postulante);
    if (this.postulante.fotografia == null) {
      this.postulante.fotografia = 'assets/img/user.png';
    }
  }
}
