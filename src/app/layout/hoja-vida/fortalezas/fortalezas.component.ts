import { Fortaleza } from './../../../models/fortaleza';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortalezas',
  templateUrl: './fortalezas.component.html',
  styleUrls: ['./fortalezas.component.css']
})
export class FortalezasComponent implements OnInit {
  fortaleza: Fortaleza;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.fortaleza = new Fortaleza();
  }

  open(content, item: Fortaleza, editar) {
    if ( editar ) {
      this.fortaleza = item;
    } else {
      this.fortaleza = new Fortaleza();
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
    this.postulanteService.postulante.fortalezas.push(this.fortaleza);
    this.fortaleza = new Fortaleza();
  }

  borrar(item: Fortaleza) {
    const fortalezas = [];
    this.postulanteService.postulante.fortalezas.forEach(element => {
      if (element !== item) {
        fortalezas.push(element);
      }
    });
    this.postulanteService.postulante.fortalezas = fortalezas;
  }
}
