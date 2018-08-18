export class Contactado {
  id: string;
  idEmpresa: string;
  idPostulante: string;
  fecha: Date;

  constructor() {
    this.fecha = new Date();
  }
}
