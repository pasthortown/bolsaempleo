import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

export class FirebaseController {
  coleccion: AngularFireList<any>;
  coleccionBDD: string;

  constructor(coleccion: string, private firebase: AngularFireDatabase) {
    this.coleccionBDD = coleccion;
    this.leer();
  }

  leer() {
    return this.coleccion = this.firebase.list(this.coleccionBDD, ref => {
      return ref;
    });
  }

  querySimple(campo: string, valor: string) {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild(campo).startAt(valor);
    });
  }

  filtroExacto(campo: string, valor: string) {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild(campo).equalTo(valor);
    });
  }

  getId(campo: string, valor: string) {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild(campo).equalTo(valor);
    });
  }

  getAll() {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref;
    });
  }

  getAllAux() {
    return this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild('provincia').equalTo('PICHINCHA');
    });
  }

  getPagina(pagina: number, registrosPorPagina: number, campo: string) {
    return this.coleccion = this.firebase.list(this.coleccionBDD, ref => {
      return ref.orderByChild(campo).limitToFirst(registrosPorPagina * pagina);
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
