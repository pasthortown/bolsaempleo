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

  querySimple(campo: string, valor: string) {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild(campo).equalTo(valor);
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
