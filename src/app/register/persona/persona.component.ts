import { Component, OnInit } from '@angular/core';
import { Postulante } from '../../models/postulante';
import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { PostulanteService } from '../../services/postulante.service';
import { CifradoService } from '../../services/cifrado.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  postulante: Postulante;
  contrasena: string;
  constructor(private postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService,
    private cifradoService: CifradoService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  existe(): boolean {
    // const existe = this.firebaseBDDService.firebaseControllerPostulantes
    // .leer(this.postulanteService.postulante);
    // return existe;
    return false;
  }

  registrar() {
    if (!this.existe()) {
      // TODO : crear usuario en firebase
      this.postulanteService.postulante = this.postulante;
      this.firebaseBDDService.firebaseControllerPostulantes
        .insertar(this.postulanteService.postulante);
    }
  }
}
