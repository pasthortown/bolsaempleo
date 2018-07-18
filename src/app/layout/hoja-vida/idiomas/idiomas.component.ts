import { Idioma } from './../../../models/idioma';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  idioma: Idioma;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService) { }

  ngOnInit() {
    this.idioma = new Idioma();
  }

  open(content, item: Idioma, editar) {
    if ( editar ) {
      this.idioma = item;
    } else {
      this.idioma = new Idioma();
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
    this.postulanteService.postulante.idiomas.push(this.idioma);
    this.idioma = new Idioma();
  }

  borrar(item: Idioma) {
    const idiomas = [];
    this.postulanteService.postulante.idiomas.forEach(element => {
      if (element !== item) {
        idiomas.push(element);
      }
    });
    this.postulanteService.postulante.idiomas = idiomas;
  }
}
