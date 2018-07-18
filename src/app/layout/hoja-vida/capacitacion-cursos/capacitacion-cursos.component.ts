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

  agregar() {
    if ( this.postulanteService.postulante.capacitaciones == null ) {
      this.postulanteService.postulante.capacitaciones = [];
    }
    this.postulanteService.postulante.capacitaciones.push(this.capacitacion);
    this.capacitacion = new Capacitacion();
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
