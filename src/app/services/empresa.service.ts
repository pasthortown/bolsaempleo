import {Injectable} from '@angular/core';
import {Empresa} from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresa: Empresa;

  constructor() {
    this.empresa = JSON.parse(localStorage.getItem('usuarioNegocio')) as Empresa;
    if (this.empresa == null) {
      return;
    }
    if (this.empresa.fotografia == null) {
      this.empresa.fotografia = 'assets/img/user.png';
    }
  }
}
