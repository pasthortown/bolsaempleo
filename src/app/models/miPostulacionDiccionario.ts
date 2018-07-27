import { Oferta } from './oferta';
import { Empresa } from './empresa';

export class PostulacionDiccionario {
  id: string;
  oferta: Oferta;
  empresa: Empresa;
  fecha: Date;

  constructor() {
    this.fecha = new Date();
  }
}
