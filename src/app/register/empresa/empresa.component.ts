import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FirebaseBDDService } from '../../services/firebase-bdd.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresa: Empresa;
  contrasena: string;
  confirmacion: string;

  constructor(private empresaService: EmpresaService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this.empresa = new Empresa();
  }

  estaCompleto(): boolean {
    if (!this.empresa.correoElectronico || !this.contrasena) {
      return false;
    }
    return true;
  }

  sonIguales(): boolean {
    if (!this.confirmacion || !this.contrasena) {
      return false;
    }
    if (this.confirmacion !== this.contrasena) {
      return false;
    }
    return true;
  }

  esCompleja(): boolean {
    return true;
  }

  esValido(): boolean {
    if (!this.estaCompleto()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Datos incompletos',
        text: 'Validación',
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    }
    if (!this.sonIguales()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Las contraseñas no coincide',
        text: 'Validación',
        showConfirmButton: false,
        timer: 3000
      });
      return false;
    }
    if (!this.esCompleja()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'La contraseña debe ser más compleja',
        text: 'Validación',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    return true;
  }

  registrar() {
    if (!this.esValido()) {
      return;
    }
    this.authService.createUserWithEmailAndPassword(this.empresa.correoElectronico, this.contrasena).then(x => {
      this.empresaService.empresa = this.empresa;
      this.firebaseBDDService.firebaseControllerEmpresas.insertar(this.empresaService.empresa);
      swal({
        position: 'center',
        type: 'success',
        title: 'Registro de empresa',
        text: 'Registro Satisfactorio',
        showConfirmButton: false,
        timer: 2000
      });
      this._router.navigate(['/login']);
    }).catch(error => {
      swal({
        position: 'center',
        type: 'error',
        title: 'Registro de empresa',
        text: 'Se produjo un error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }
}
