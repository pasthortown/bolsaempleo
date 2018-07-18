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

  constructor(private postulanteService: PostulanteService, private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    /*this.firebaseBDDService.leerPostulantes().snapshotChanges().subscribe(items => {
      this.postulantes = [];
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.toJSON() as Postulante;
        itemLeido.id = element.key;
        this.postulantes.push(itemLeido as Postulante);
      });
    });*/
    this.firebaseBDDService.firebaseControllerPostulantes.query().snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        console.log(element.payload.toJSON());
        itemLeido = element.payload.toJSON() as Postulante;
        itemLeido.id = element.key;
        itemLeido.idiomas = [];
        this.postulanteService.postulante = itemLeido;
        //console.log(this.postulanteService.postulante);
      });
    });
  }

  guardarCambios() {
    //console.log(this.postulanteService.postulante);
    //this.firebaseBDDService.firebaseControllerPostulantes.insertar(this.postulanteService.postulante);
    this.postulanteService.postulante.id = '-LHi96VymBMtGV1nitXC';
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
  }
}
