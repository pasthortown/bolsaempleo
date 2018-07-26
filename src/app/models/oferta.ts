export class Oferta {
  id: string;
  idEmpresa: string;
  codigo: string;
  cargo: string;
  inicioPublicacion: Date;
  finPublicacion: Date;
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
  ciudad: string;
  campoAmplio: string;
  campoEspecifico: string;
  total: string;

  constructor() {
    this.tipoContrato = '';
    this.remuneracion = '';
    this.tiempoExperiencia = '';
    this.horasCapacitacion = '';
    this.jornada = '';
    this.tipoContrato = '';
    this.ciudad = '';
    this.campoAmplio = '';
    this.campoEspecifico = '';
  }
}
