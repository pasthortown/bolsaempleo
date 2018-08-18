import {Component, OnInit} from '@angular/core';
import {Empresa} from '../../models/empresa';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {AuthService} from '../../services/auth.service';
import {EmpresaService} from '../../services/empresa.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {Postulante} from '../../models/postulante';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresa: Empresa;
  contrasena: string;
  confirmacion: string;
  correoValido: boolean;
  claveValida: boolean;
  claveConfirmacionValida: boolean;
  paginaWebValida: boolean;

  constructor(private empresaService: EmpresaService,
              private firebaseBDDService: FirebaseBDDService,
              public authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.claveValida = false;
    this.claveConfirmacionValida = false;
    this.paginaWebValida = false;
    this.empresa = new Empresa();
  }

  validarClave(): boolean {
    if (this.confirmacion == null || this.confirmacion.length == 0) {
      if (this.contrasena.length < 6) {
        this.claveValida = false;
      } else {
        this.claveValida = true;
      }
    } else {
      if (this.contrasena == this.confirmacion && this.contrasena.length >= 6) {
        this.claveValida = true;
        this.claveConfirmacionValida = true;
      } else {
        this.claveValida = false;
        this.claveConfirmacionValida = false;
      }
    }

    return this.claveValida;
  }

  validarClaveConfirmacion(): boolean {
    console.log(this.contrasena);
    if (this.contrasena == null || this.contrasena.length == 0) {
      if (this.confirmacion.length < 6) {
        this.claveConfirmacionValida = false;
      } else {
        this.claveConfirmacionValida = true;
      }
    } else {
      if (this.contrasena == this.confirmacion && this.contrasena.length >= 6) {
        this.claveValida = true;
        this.claveConfirmacionValida = true;
      } else {
        this.claveValida = false;
        this.claveConfirmacionValida = false;
      }
    }
    return this.claveConfirmacionValida;
  }

  validarCorreoElectronico(correoElectronico: string) {
    const expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (expreg.test(correoElectronico)) {
      this.correoValido = true;
      return true;
    } else {
      this.correoValido = false;
      return false;
    }

  }

  validarPaginaWeb(paginaWeb: string) {
    const expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (expreg.test(paginaWeb)) {
      this.paginaWebValida = true;
      return true;
    } else {
      this.paginaWebValida = false;
      return false;
    }

  }

  validarFormulario(registro: Empresa): string {
    let errores = '';
    if (this.contrasena.length < 6 || this.confirmacion.length < 6) {
      errores += 'La contraseña debe tener más de 6 caracteres';
    }

    if (!this.validarCorreoElectronico(registro.correoElectronico)) {
      if (errores.length > 0) {
        errores += ' - ';
      }
      errores += 'Correo electrónico no válido';
    }
    if (this.confirmacion !== this.contrasena) {
      if (errores.length > 0) {
        errores += ' - ';
      }
      errores += 'Las contraseñas no coinciden';
    }
    if (registro.correoElectronico.length > 0) {
      const correo = registro.correoElectronico.split('', 1);
      console.log(correo);
    }
    return errores;
  }

  registrar() {
    const validacion = this.validarFormulario(this.empresa);
    if (validacion === '') {
      this.empresa.nombreComercial = this.empresa.nombreComercial.toUpperCase();
      this.empresa.actividadEconomica = this.empresa.actividadEconomica.toUpperCase();
      this.empresa.correoElectronico = this.empresa.correoElectronico.toUpperCase();
      if (this.empresa.paginaWeb != null) {
        this.empresa.paginaWeb = this.empresa.paginaWeb.toLowerCase();
        this.empresa.paginaWeb = 'www.' + this.empresa.paginaWeb;
      }
      this.empresa.direccion = this.empresa.direccion.toUpperCase();
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
    } else {
      swal({
        position: 'center',
        type: 'error',
        title: 'Formulario Incompleto',
        text: validacion,
        showConfirmButton: true
      });
    }
  }
}
