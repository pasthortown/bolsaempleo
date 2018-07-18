import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {
  contadorPersonas: number;
  contadorEmpresas: number;

  constructor(private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    this.contadorPersonas = 0;
    this.contadorEmpresas = 0;

    this.firebaseBDDService.firebaseControllerPostulantes.leer().snapshotChanges().subscribe(items => {
      items.forEach(element => {
        this.contadorPersonas++;
      });
    });

    this.firebaseBDDService.firebaseControllerEmpresas.leer().snapshotChanges().subscribe(items => {
      items.forEach(element => {
        this.contadorEmpresas++;
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
