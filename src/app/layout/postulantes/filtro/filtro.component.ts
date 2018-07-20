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

  constructor(private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) {}

  ngOnInit() {
    this.postulantes = [];
    this.talentoHumano();
    this.filtro = [ {area: 'Fecha',
                    href: 'Fecha',
                    criterios: [{descripcion: 'Año'},
                                {descripcion: 'Mes'},
                                {descripcion: 'Día'},
                                {descripcion: 'Semana'}
                              ]},
                    {area: 'Fecha2',
                    href: 'Fecha2',
                    criterios: [{descripcion: 'Año2'},
                                {descripcion: 'Mes2'},
                                {descripcion: 'Día2'},
                                {descripcion: 'Semana2'}
                              ]},
                  ];
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
}
