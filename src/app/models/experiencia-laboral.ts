export class ExperienciaLaboral {
  id: string;
  empleador: string;
  cargoDesempenado: string;
  nombreEvento: string;
  descripcionCargo: string;
  fechaInicio: any;
  fechaFinalizacion: any;
  actualmenteVigente: boolean;
  motivoSalida: string;

  constructor() {
    this.motivoSalida = '';
  }
}
