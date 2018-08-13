import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Capacitacion} from './../../../models/capacitacion';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {EstudioRealizado} from '../../../models/estudio-realizado';

@Component({
  selector: 'app-capacitacion-cursos',
  templateUrl: './capacitacion-cursos.component.html',
  styleUrls: ['./capacitacion-cursos.component.css']
})
export class CapacitacionCursosComponent implements OnInit {
  capacitacion: Capacitacion;

  constructor(
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.capacitacion = new Capacitacion();
    this.ordenarPorAntiguedad(true);
  }

  open(content, item: Capacitacion, editar) {
    if (editar) {
      this.capacitacion = item;
    } else {
      this.capacitacion = new Capacitacion();
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (!editar) {
            this.agregar();
            this.actualizar();
          }
        }
      }), (resultCancel => {

      }));
  }

  ordenarPorAntiguedad(descendente: boolean) {
    this.postulanteService.postulante.capacitaciones.sort((n1, n2) => {
      const fechaInicio = new Date(n1.fechaInicio.year + '/' + n1.fechaInicio.month + '/' + n1.fechaInicio.day);
      const fechaFin = new Date(n2.fechaInicio.year + '/' + n2.fechaInicio.month + '/' + n2.fechaInicio.day);
      if (fechaFin > fechaInicio) {
        if (descendente) {
          return 1;
        } else {
          return -1;
        }
      }
      if (fechaFin < fechaInicio) {
        if (descendente) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }

  agregar() {
    if (this.postulanteService.postulante.capacitaciones == null) {
      this.postulanteService.postulante.capacitaciones = [];
    }
    this.postulanteService.postulante.capacitaciones.push(this.capacitacion);
    this.capacitacion = new Capacitacion();
    this.ordenarPorAntiguedad(true);
  }

  borrar(item: Capacitacion) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.nombreEvento,
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const estudios = [];
        this.postulanteService.postulante.capacitaciones.forEach(element => {
          if (element !== item) {
            estudios.push(element);
          }
        });
        this.postulanteService.postulante.capacitaciones = estudios;
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
    this.postulanteService.postulante.capacitaciones.forEach(value => {
      value.institucion = value.institucion.toUpperCase();
      value.nombreEvento = value.nombreEvento.toUpperCase();
    });
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
