import {FirebaseController} from './../models/firebase-controller';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBDDService {
  firebaseControllerPostulantes: FirebaseController;
  firebaseControllerEmpresas: FirebaseController;
  firebaseControllerOfertas: FirebaseController;
  firebaseControllerPostulaciones: FirebaseController;
  firebaseControllerContactados: FirebaseController;

  constructor(private firebase: AngularFireDatabase) {
    this.firebaseControllerPostulantes = new FirebaseController('postulantes', firebase);
    this.firebaseControllerEmpresas = new FirebaseController('empresas', firebase);
    this.firebaseControllerOfertas = new FirebaseController('ofertas', firebase);
    this.firebaseControllerPostulaciones = new FirebaseController('postulaciones', firebase);
    this.firebaseControllerContactados = new FirebaseController('contactados', firebase);
  }
}
