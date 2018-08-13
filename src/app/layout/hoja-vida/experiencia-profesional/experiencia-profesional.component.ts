import {ExperienciaLaboral} from './../../../models/experiencia-laboral';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Fortaleza} from '../../../models/fortaleza';

@Component({
  selector: 'app-experiencia-profesional',
  templateUrl: './experiencia-profesional.component.html',
  styleUrls: ['./experiencia-profesional.component.css']
})
export class ExperienciaProfesionalComponent implements OnInit {
  experienciaLaboral: ExperienciaLaboral;

  constructor(
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.experienciaLaboral = new ExperienciaLaboral();
    this.ordenarPorAntiguedad(true);
  }

  open(content, item: ExperienciaLaboral, editar) {
    if (editar) {
      this.experienciaLaboral = item;
    } else {
      this.experienciaLaboral = new ExperienciaLaboral();
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
    this.postulanteService.postulante.experienciasLaborales.sort((n1, n2) => {
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
    if (this.postulanteService.postulante.experienciasLaborales == null) {
      this.postulanteService.postulante.experienciasLaborales = [];
    }
    if (this.experienciaLaboral.fechaFinalizacion !== null) {
      if (!this.compararFechas(this.experienciaLaboral.fechaInicio, this.experienciaLaboral.fechaFinalizacion)) {
        return;
      }
    }
    this.postulanteService.postulante.experienciasLaborales.push(this.experienciaLaboral);
    this.experienciaLaboral = new ExperienciaLaboral();
    this.ordenarPorAntiguedad(true);
  }

  borrar(item: ExperienciaLaboral) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.cargoDesempenado,
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const experiencias = [];
        this.postulanteService.postulante.experienciasLaborales.forEach(element => {
          if (element !== item) {
            experiencias.push(element);
          }
        });
        this.postulanteService.postulante.experienciasLaborales = experiencias;
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

  validarFechaFinTrabajo() {
    this.experienciaLaboral.motivoSalida = '';
    this.experienciaLaboral.fechaFinalizacion = null;
  }

  compararFechas(fechaMenor: any, fechaMayor: any): boolean {
    const fechaInicio = new Date(fechaMenor.year + '/' + fechaMenor.month + '/' + fechaMenor.day);
    const fechaFin = new Date(fechaMayor.year + '/' + fechaMayor.month + '/' + fechaMayor.day);
    if (fechaFin < fechaInicio) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Datos Incorrectos',
        text: 'Hay un error en las fechas ingresadas.',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    return true;
  }

  actualizar() {
    this.postulanteService.postulante.experienciasLaborales.forEach(value => {
      value.empleador = value.empleador.toUpperCase();
      value.cargoDesempenado = value.cargoDesempenado.toUpperCase();
      value.descripcionCargo = value.descripcionCargo.toUpperCase();
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
