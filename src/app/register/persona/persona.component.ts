import { Component, OnInit } from '@angular/core';
import { Postulante } from '../../models/postulante';
import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { PostulanteService } from '../../services/postulante.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  postulante = new Postulante();
  contrasena: string;
  confirmacion: string;

  constructor(private postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  existe(): boolean {
    const resultado = this.firebaseBDDService.firebaseControllerPostulantes
      .querySimple('correoElectronico', this.postulante.correoElectronico);
    if (resultado) {
      return true;
    }
    return false;
  }

  registrar() {
    // TODO : verificar datos obligatorios
    // TODO : verificar coincidencia entre contrasena y confirmar
    // TODO : verificar valores duplicados en la base de datos: identificacion, correo, razon social
    // if (!this.existe()) {
    this.authService.createUserWithEmailAndPassword(this.postulante.correoElectronico
      , this.contrasena).then(resultado => {
        this.postulanteService.postulante = this.postulante;
        this.firebaseBDDService.firebaseControllerPostulantes
          .insertar(this.postulanteService.postulante);
        // TODO : mensaje de alerta
      }).catch(error => {
        // TODO : mensaje de alerta
        alert(error.message);
        console.log(error);
      });
    // }
  }
}
