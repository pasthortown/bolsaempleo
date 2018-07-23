import { Injectable } from '@angular/core';

@Injectable()
export class PermisoService {

  acciones: Accion[] = Array<Accion>();

  constructor() {
    this.llenar();
  }

  tieneAcceso(rol: string, url: string): boolean {
    const found = this.acciones.find(function(element) {
      return element.rol === rol && element.url === url;
    });
    return found !== undefined;
  }

  llenar() {
    // e : empresa
    // p : postulante
    // a : administrador

    this.acciones.push(new Accion('e', 'reset'));
    this.acciones.push(new Accion('p', 'reset'));
    this.acciones.push(new Accion('a', 'reset'));

    this.acciones.push(new Accion('e', 'empresa'));
    this.acciones.push(new Accion('p', 'empresa'));
    this.acciones.push(new Accion('a', 'empresa'));

    this.acciones.push(new Accion('e', 'persona'));
    this.acciones.push(new Accion('p', 'persona'));
    this.acciones.push(new Accion('a', 'persona'));

    // TODO : colocar permisos
  }
}

export class Accion {
  rol: string;
  url: string;
  constructor(rol: string, url: string) {
    this.rol = rol;
    this.url = url;
  }
}
