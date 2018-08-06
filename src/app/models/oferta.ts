export class Oferta {
  id: string;
  idEmpresa: string;
  codigo: string;
  cargo: string;
  inicioPublicacion: any;
  finPublicacion: any;
  tipoContrato: string;
  contacto: string;
  correoElectronico: string;
  telefonoCelular: string;
  telefonoFijo: string;
  remuneracion: string;
  tiempoExperiencia: string;
  actividades: string;
  horasCapacitacion: string;
  jornada: string;
  informacionAdicional: string;
  numeroPuestos: number;
  nombreComercial: string;
  provincia: string;
  canton: string;
  campoAmplio: string;
  campoEspecifico: string;
  total: string;

  constructor() {
    this.id = '0';
    this.numeroPuestos = 1;
    this.tipoContrato = '';
    this.remuneracion = '';
    this.tiempoExperiencia = '';
    this.horasCapacitacion = '';
    this.jornada = '';
    this.tipoContrato = '';
    this.provincia = '';
    this.campoAmplio = '';
    this.campoEspecifico = '';
  }
}
