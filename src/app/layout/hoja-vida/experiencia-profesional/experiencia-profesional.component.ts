import {ExperienciaLaboral} from './../../../models/experiencia-laboral';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';

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
}
