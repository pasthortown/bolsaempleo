import { Postulante } from './postulante';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

export class FirebaseController {
  coleccion: AngularFireList<any>;
  coleccionBDD: string;

  constructor(coleccion: string, private firebase: AngularFireDatabase) {
    this.coleccionBDD = coleccion;
    this.leer();
  }

  leer() {
    return this.coleccion = this.firebase.list(this.coleccionBDD);
  }

  query() {
    return this.firebase.list('postulantes', ref => {
      return ref.orderByChild('id').equalTo('-LHi96VymBMtGV1nitXC');
    });
  }

  insertar(objeto: any) {
    this.coleccion.push(objeto);
  }

  actualizar(objeto: any) {
    this.coleccion.update(objeto.id, objeto);
  }

  borrar(objeto: any) {
    this.coleccion.remove(objeto.id);
  }
}
