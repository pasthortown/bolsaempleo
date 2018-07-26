import { AuthService } from './../../services/auth.service';
import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { Component, OnInit } from '@angular/core';
import { PostulanteService } from '../../services/postulante.service';
import { Postulante } from '../../models/postulante';
import swal from 'sweetalert2';
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  postulantes = [];

  constructor(private postulanteService: PostulanteService, private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {

  }

  guardarCambios() {
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
    localStorage.setItem('usuarioNegocio', JSON.stringify(this.postulanteService.postulante));
    swal({
      position: 'center',
      type: 'success',
      title: 'Insertar',
      text: 'Registro exitoso!',
      showConfirmButton: true,
      timer: 2000
    });
  }
}
