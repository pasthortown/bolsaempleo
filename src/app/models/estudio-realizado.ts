export class EstudioRealizado {
  id: string;
  tipo_titulo: string;
  institucion: string;
  titulo: string;
  fechaRegistro: any;
  codigoRegistroSENESCYT: string;

  constructor() {
    this.institucion = '';
    this.tipo_titulo = '';
    this.titulo = '';
  }
}
