export class Oferta {
  id: number;
  codigo: string;
  cargo: string;
  inicioPublicacion: Date;
  finPublicacion: Date;
  tipoContrato: string;
  contacto: string;
  correoElectronico: string;
  telefonoCelular: string;
  telefonoFijo: string;
  instruccionNivel: string;
  remuneracion: string;
  tiempoExperiencia: string;
  actividades: string;
  horasCapacitacion: string;
  jornada: string;
  informacionAdicional: string;
  numeroPuestos: number;
  nombreComercial: string;
  ciudad: string;

  constructor() {
    this.tipoContrato = '';
    this.instruccionNivel = '';
    this.remuneracion = '';
    this.tiempoExperiencia = '';
    this.horasCapacitacion = '';
    this.jornada = '';
    this.tipoContrato = '';
    this.ciudad = '';
  }
}
