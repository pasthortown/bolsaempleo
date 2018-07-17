export class Capacitacion {
  id: string;
  tipoEvento: string;
  institucion: string;
  nombreEvento: string;
  fechaInicio: any;
  fechaFinalizacion: any;
  horas: number;
  tipoCertificado: string;

  constructor() {
    this.tipoEvento = '';
    this.tipoCertificado = '';
  }
}
