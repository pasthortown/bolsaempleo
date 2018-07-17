import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';
import { EstudioRealizado } from '../../../models/estudio-realizado';

@Component({
  selector: 'app-estudios-realizados',
  templateUrl: './estudios-realizados.component.html',
  styleUrls: ['./estudios-realizados.component.css']
})
export class EstudiosRealizadosComponent implements OnInit {
  estudioRealizado: EstudioRealizado;

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.estudioRealizado = new EstudioRealizado();
  }

  agregar() {
    this.postulanteService.postulante.estudiosRealizados.push(this.estudioRealizado);
    this.estudioRealizado = new EstudioRealizado();
  }

  editar(item: EstudioRealizado) {
    this.estudioRealizado = item;
  }

  borrar(item: EstudioRealizado) {
    const estudios = [];
    this.postulanteService.postulante.estudiosRealizados.forEach(element => {
      if (element !== item) {
        estudios.push(element);
      }
    });
    this.postulanteService.postulante.estudiosRealizados = estudios;
  }

  nuevo() {
    this.estudioRealizado = new EstudioRealizado();
  }

  actualizar() {
    this.estudioRealizado = new EstudioRealizado();
  }
}
