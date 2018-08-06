export class Postulacion {
  id: string;
  idOferta: string;
  idPostulante: string;
  fecha: Date;

  constructor() {
    this.fecha = new Date();
  }
}
