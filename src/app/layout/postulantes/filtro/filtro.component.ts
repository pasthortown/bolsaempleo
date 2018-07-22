import { catalogos } from './../../../../environments/catalogos';
import { FirebaseBDDService } from './../../../services/firebase-bdd.service';
import { Postulante } from './../../../models/postulante';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filtro: Array<any>;
  postulantes: Array<Postulante>;
  opcionSeleccionada = '';
  tipo_titulo: Array<any>;

  constructor(private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) {}

  ngOnInit() {
    this.postulantes = [];
    this.talentoHumano();
    this.filtro = catalogos.titulos;
  }

  talentoHumano() {
    this.firebaseBDDService.firebaseControllerPostulantes.leer()
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
    });
  }

  open(content) {
    this.modalService.open(content)
    .result
    .then((resultAceptar => {

    }), (resultCancel => {

    }));
  }

  mostrar() {
    this.filtro.forEach(element => {
      if (this.opcionSeleccionada === '') {
        this.tipo_titulo = null;
        return;
      }
      if (element.campo_amplio === this.opcionSeleccionada) {
        this.tipo_titulo = element.campos_especificos;
      }
    });
  }
}
