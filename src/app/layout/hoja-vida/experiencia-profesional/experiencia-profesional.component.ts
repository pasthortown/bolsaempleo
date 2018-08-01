import {ExperienciaLaboral} from './../../../models/experiencia-laboral';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia-profesional',
  templateUrl: './experiencia-profesional.component.html',
  styleUrls: ['./experiencia-profesional.component.css']
})
export class ExperienciaProfesionalComponent implements OnInit {
  experienciaLaboral: ExperienciaLaboral;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) {
  }

  ngOnInit() {
    this.experienciaLaboral = new ExperienciaLaboral();
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
          }
        }
      }), (resultCancel => {

      }));
  }

  agregar() {
    if (this.postulanteService.postulante.experienciasLaborales == null) {
      this.postulanteService.postulante.experienciasLaborales = [];
    }
    this.postulanteService.postulante.experienciasLaborales.push(this.experienciaLaboral);
    this.experienciaLaboral = new ExperienciaLaboral();
  }

  borrar(item: ExperienciaLaboral) {
    const experiencias = [];
    this.postulanteService.postulante.experienciasLaborales.forEach(element => {
      if (element !== item) {
        experiencias.push(element);
      }
    });
    this.postulanteService.postulante.experienciasLaborales = experiencias;
  }

  validarFechaFinTrabajo() {
    if (this.experienciaLaboral) {
      this.experienciaLaboral.motivoSalida = '';
      this.experienciaLaboral.fechaFinalizacion = null;
    }
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
}
