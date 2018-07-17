import { Postulante } from './../models/postulante';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBDDService {
  postulantes: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  leerPostulantes() {
    return this.postulantes = this.firebase.list('Postulantes');
  }

  insertarPostulante(postulante: Postulante) {
    this.postulantes.push(postulante);
  }

  actualizarPostulante(postulante: Postulante) {
    this.postulantes.update(postulante.id, postulante);
  }

  borrarPostulante(postulante: Postulante) {
    this.postulantes.remove(postulante.id);
  }
}
