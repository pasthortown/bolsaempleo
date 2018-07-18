import { ReferenciaPersonal } from './../../../models/referenciaPersonal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referencias-personales',
  templateUrl: './referencias-personales.component.html',
  styleUrls: ['./referencias-personales.component.css']
})
export class ReferenciasPersonalesComponent implements OnInit {
  referenciaPersonal: ReferenciaPersonal;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.referenciaPersonal = new ReferenciaPersonal();
  }

  open(content, item: ReferenciaPersonal, editar) {
    if ( editar ) {
      this.referenciaPersonal = item;
    } else {
      this.referenciaPersonal = new ReferenciaPersonal();
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
    this.postulanteService.postulante.referenciasPersonales.push(this.referenciaPersonal);
    this.referenciaPersonal = new ReferenciaPersonal();
  }

  borrar(item: ReferenciaPersonal) {
    const referencias = [];
    this.postulanteService.postulante.referenciasPersonales.forEach(element => {
      if (element !== item) {
        referencias.push(element);
      }
    });
    this.postulanteService.postulante.referenciasPersonales = referencias;
  }
}