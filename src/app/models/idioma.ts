export class Idioma {
  id: string;
  idioma: string;
  nivelEscrito: string;
  nivelHablado: string;
  nivelLectura: string;

  constructor() {
    this.nivelEscrito = '';
    this.nivelHablado = '';
    this.nivelLectura = '';
  }
}
