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
  direccion: string;
  estudiosRealizados: Array<EstudioRealizado>;
  capacitaciones: Array<Capacitacion>;
  experienciasLaborales: Array<ExperienciaLaboral>;
  idiomas: Array<Idioma>;
  fortalezas: Array<Fortaleza>;
  referenciasPersonales: Array<ReferenciaPersonal>;

  constructor() {
    this.estadoCivil = '';
    this.estudiosRealizados = [];
    this.capacitaciones = [];
    this.experienciasLaborales = [];
    this.idiomas = [];
    this.fortalezas = [];
    this.referenciasPersonales = [];
  }
}
