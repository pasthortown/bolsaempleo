import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBDDService {
  coleccion: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  leer() {
    return this.coleccion = this.firebase.list('coleccion');
  }

  crear() {
    //this.coleccion.push(this.productoSeleccionado);
  }

  actualizar() {
    /*this.coleccion.update(this.productoSeleccionado.id, {
      nombre: this.productoSeleccionado.nombre,
      clase: this.productoSeleccionado.clase,
      precio: this.productoSeleccionado.precio
    });*/
  }

  borrar(id: string) {
    this.coleccion.remove(id);
  }
}
