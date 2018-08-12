import {ReferenciaPersonal} from './../../../models/referenciaPersonal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {EstudioRealizado} from '../../../models/estudio-realizado';

@Component({
  selector: 'app-referencias-personales',
  templateUrl: './referencias-personales.component.html',
  styleUrls: ['./referencias-personales.component.css']
})
export class ReferenciasPersonalesComponent implements OnInit {
  referenciaPersonal: ReferenciaPersonal;
  instituciones: Array<any>;

  constructor(
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.referenciaPersonal = new ReferenciaPersonal();
  }

  open(content, item: ReferenciaPersonal, editar) {
    if (editar) {
      this.referenciaPersonal = item;
    } else {
      this.referenciaPersonal = new ReferenciaPersonal();
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (!editar) {
            this.agregar();
          }
        }
      }), (resultCancel => {

      }));
  }

  agregar() {
    if (this.postulanteService.postulante.referenciasPersonales == null) {
      this.postulanteService.postulante.referenciasPersonales = [];
    }
    this.postulanteService.postulante.referenciasPersonales.push(this.referenciaPersonal);
    this.referenciaPersonal = new ReferenciaPersonal();
  }

  borrar(item: ReferenciaPersonal) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.cargo,
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const referencias = [];
        this.postulanteService.postulante.referenciasPersonales.forEach(element => {
          if (element !== item) {
            referencias.push(element);
          }
        });
        this.postulanteService.postulante.referenciasPersonales = referencias;
        this.actualizar();
        swal({
          title: 'Oferta',
          text: 'Eliminación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  actualizar() {
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
    swal({
      position: 'center',
      type: 'success',
      title: 'Estudio Realizado',
      text: 'Registro exitoso!',
      showConfirmButton: true,
      timer: 2000
    });
  }
}
