import { catalogos } from './../../../../environments/catalogos';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  filtro: Array<any>;
  tipo_titulo: Array<any>;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.estudioRealizado = new EstudioRealizado();
    this.filtro = catalogos.titulos;
  }

  open(content, item: EstudioRealizado, editar) {
    if ( editar ) {
      this.estudioRealizado = item;
      this.mostrar();
    } else {
      this.estudioRealizado = new EstudioRealizado();
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
    if ( this.postulanteService.postulante.estudiosRealizados == null ) {
      this.postulanteService.postulante.estudiosRealizados = [];
    }
    this.postulanteService.postulante.estudiosRealizados.push(this.estudioRealizado);
    this.estudioRealizado = new EstudioRealizado();
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

  mostrar() {
    this.filtro.forEach(element => {
      if (this.estudioRealizado.tipo_titulo === '') {
        this.tipo_titulo = null;
        return;
      }
      if (element.campo_amplio === this.estudioRealizado.tipo_titulo) {
        this.tipo_titulo = element.campos_especificos;
      }
    });
  }
}
