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
    // TODO : validar con HTML5 en la interfaz gráfica faltan otros campos obligatorios
    if (!this.empresa.correoElectronico || !this.contrasena) {
      return false;
    }
    return true;
  }

  sonIguales(): boolean {
    // TODO : validar con HTML5 en la interfaz gráfica
    if (!this.confirmacion || !this.contrasena) {
      return false;
    }
    // TODO : validar con HTML5 en la interfaz gráfica
    if (this.confirmacion !== this.contrasena) {
      return false;
    }
    return true;
  }

  esCompleja(): boolean {
    // TODO : esta validación se realiza en el SERVIDOR this.contrasena
    return true;
  }

  hayDuplicados(): boolean {
    // TODO : verificar valores duplicados en la base de datos: identificacion, correo, razon social
    return false;
  }

  esValido(): boolean {
    if (!this.estaCompleto()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Validación',
        text: 'Datos incompletos',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    if (!this.sonIguales()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Validación',
        text: 'Contraseña no coincide con la confirmación',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    if (!this.esCompleja()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Validación',
        text: 'Contraseña debe ser más compleja',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    if (this.hayDuplicados()) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Validación',
        text: 'Hay datos duplicados',
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

    const resultado = this.firebaseBDDService.firebaseControllerEmpresas
      .querySimple('correoElectronico', this.empresa.correoElectronico);

    resultado.snapshotChanges().subscribe(items => {
      if (items.length > 0) {
        swal({
          position: 'center',
          type: 'warning',
          title: 'Validación',
          text: 'Correo duplicado',
          showConfirmButton: false,
          timer: 2000
        });
        return false;
      }

      this.authService.createUserWithEmailAndPassword(this.empresa.correoElectronico
        , this.contrasena).then(x => {
          this.empresaService.empresa = this.empresa;
          this.firebaseBDDService.firebaseControllerEmpresas
            .insertar(this.empresaService.empresa);
          swal({
            position: 'center',
            type: 'success',
            title: 'Registro de empresa',
            text: 'Todo bien',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigate(['postulantes']);
        }).catch(error => {
          swal({
            position: 'center',
            type: 'error',
            title: 'Registro de empresa',
            text: 'Se produjo un error',
            showConfirmButton: false,
            timer: 2000
          });
          console.log(error);
        });
    });
  }
}
