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

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.capacitacion = new Capacitacion();
  }

  agregar() {
    this.postulanteService.postulante.capacitaciones.push(this.capacitacion);
    this.capacitacion = new Capacitacion();
  }

  editar(item: Capacitacion) {
    this.capacitacion = item;
  }

  borrar(item: Capacitacion) {
    const capacitaciones = [];
    this.postulanteService.postulante.capacitaciones.forEach(element => {
      if (element !== item) {
        capacitaciones.push(element);
      }
    });
    this.postulanteService.postulante.capacitaciones = capacitaciones;
  }

  nuevo() {
    this.capacitacion = new Capacitacion();
  }

  actualizar() {
    this.capacitacion = new Capacitacion();
  }
}
