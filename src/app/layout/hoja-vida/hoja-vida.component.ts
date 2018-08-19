import {Postulante} from './../../models/postulante';
import {AuthService} from './../../services/auth.service';
import {FirebaseBDDService} from './../../services/firebase-bdd.service';
import {Component, OnInit} from '@angular/core';
import {PostulanteService} from '../../services/postulante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  postulantes = [];

  constructor(
    private authService: AuthService,
    private postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.postulanteService.postulante = this.authService.usuarioNegocio as Postulante;
    this.validarEstudiosRealizados();
  }

  guardarCambios() {
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
    swal({
      position: 'center',
      type: 'success',
      title: 'Insertar',
      text: 'Registro exitoso!',
      showConfirmButton: true,
      timer: 2000
    });
  }

  validarEstudiosRealizados() {
    if (this.postulanteService.postulante.estudiosRealizados == null) {
      swal({
        title: 'Por favor complete sus datos',
        text: 'Mientras no actualice su información no aparecerá en Profesionales!',
        type: 'warning'
      });
    }
  }
}
