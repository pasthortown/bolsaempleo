import { ReferenciaPersonal } from './referenciaPersonal';
import { Fortaleza } from './fortaleza';
import { Idioma } from './idioma';
import { ExperienciaLaboral } from './experiencia-laboral';
import { Capacitacion } from './capacitacion';
import { EstudioRealizado } from './estudio-realizado';

export class Postulante {
  id: string;
  fotografia: string;
  nombreCompleto: string;
  nacionalidad: string;
  identificacion: string;
  estadoCivil: string;
  fechaDeNacimiento: any;
  correoElectronico: string;
  telefono: string;
  domicilio: string;
  estudiosRealizados = [];
  capacitaciones = [];
  experienciasLaborales = [];
  idiomas: any;
  fortalezas = [];
  referenciasPersonales = [];

  constructor() {
    this.estadoCivil = '';
  }
}
