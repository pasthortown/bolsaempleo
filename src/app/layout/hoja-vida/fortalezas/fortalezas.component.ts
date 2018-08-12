import {Fortaleza} from './../../../models/fortaleza';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import {catalogos} from '../../../../environments/catalogos';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {EstudioRealizado} from '../../../models/estudio-realizado';

@Component({
  selector: 'app-fortalezas',
  templateUrl: './fortalezas.component.html',
  styleUrls: ['./fortalezas.component.css']
})
export class FortalezasComponent implements OnInit {
  fortaleza: Fortaleza;
  habilidades: Array<any>;

  constructor(
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.fortaleza = new Fortaleza();
    this.habilidades = catalogos.habilidades;
  }

  open(content, item: Fortaleza, editar) {
    if (editar) {
      this.fortaleza = item;
    } else {
      this.fortaleza = new Fortaleza();
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
    if (this.postulanteService.postulante.fortalezas == null) {
      this.postulanteService.postulante.fortalezas = [];
    }
    this.postulanteService.postulante.fortalezas.push(this.fortaleza);
    this.fortaleza = new Fortaleza();
  }

  borrar(item: Fortaleza) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.nombre,
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const fortalezas = [];
        this.postulanteService.postulante.fortalezas.forEach(element => {
          if (element !== item) {
            fortalezas.push(element);
          }
        });
        this.postulanteService.postulante.fortalezas = fortalezas;
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
