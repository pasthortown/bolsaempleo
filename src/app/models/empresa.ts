import {Oferta} from './oferta';

export class Empresa {
  id: string;
  logo: string;
  identificacion: string;
  razonSocial: string;
  naturaleza: string;
  paginaWeb: string;
  correoElectronico: string;
  nombreComercial: string;
  actividadEconomica: string;
  telefonoCelular: string;
  telefonoFijo: string;
  direccion: string;
  oferta: Array<Oferta>;

  constructor() {
    this.naturaleza = '0';
    this.oferta = [];
  }
}
