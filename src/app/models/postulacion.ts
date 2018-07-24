import { Oferta } from './oferta';
import { Postulante } from './postulante';
export class Postulacion {
  id: number;
  postulante: Postulante;
  oferta_laboral: Oferta;

  constructor() {
    this.postulante = new Postulante();
    this.oferta_laboral = new Oferta();
  }
}
