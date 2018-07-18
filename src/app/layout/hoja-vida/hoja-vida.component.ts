import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { Component, OnInit } from '@angular/core';
import { PostulanteService } from '../../services/postulante.service';
import { Postulante } from '../../models/postulante';

@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  postulantes = [];
  id = '-LHiW7NRVSatQPsGYfZk';

  constructor(private postulanteService: PostulanteService, private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    this.firebaseBDDService.firebaseControllerPostulantes.querySimple('id', this.id).snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        itemLeido.id = element.key;
        this.postulanteService.postulante = itemLeido;
      });
    });
  }

  guardarCambios() {
    this.postulanteService.postulante.id = this.id;
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
  }
}
