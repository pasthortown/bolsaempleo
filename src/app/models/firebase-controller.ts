import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

export class FirebaseController {
  coleccion: AngularFireList<any>;
  coleccionBDD: string;
  private firebase: AngularFireDatabase;

  constructor(coleccion: string) {
    this.coleccionBDD = coleccion;
    this.leer();
  }

  leer() {
    return this.coleccion = this.firebase.list(this.coleccionBDD);
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
