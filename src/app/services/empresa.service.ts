import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {Empresa} from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresa: Empresa;

  constructor( private authService: AuthService) {
    this.empresa = this.authService.usuarioNegocio as Empresa;
  }
}
