import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Capacitacion } from './../../../models/capacitacion';
import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capacitacion-cursos',
  templateUrl: './capacitacion-cursos.component.html',
  styleUrls: ['./capacitacion-cursos.component.css']
})
export class CapacitacionCursosComponent implements OnInit {
  capacitacion: Capacitacion;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.capacitacion = new Capacitacion();
  }

  open(content, item: Capacitacion, editar) {
    if ( editar ) {
      this.capacitacion = item;
    } else {
      this.capacitacion = new Capacitacion();
    }
    this.modalService.open(content)
    .result
    .then((resultModal => {
      if ( resultModal === 'save' ) {
        if ( !editar ) {
          this.agregar();
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
    if ( this.postulanteService.postulante.capacitaciones == null ) {
      this.postulanteService.postulante.capacitaciones = [];
    }
    this.postulanteService.postulante.capacitaciones.push(this.capacitacion);
    this.capacitacion = new Capacitacion();
    this.ordenarPorAntiguedad(true);
  }

  borrar(item: Capacitacion) {
    const estudios = [];
    this.postulanteService.postulante.capacitaciones.forEach(element => {
      if (element !== item) {
        estudios.push(element);
      }
    });
    this.postulanteService.postulante.capacitaciones = estudios;
  }
}
