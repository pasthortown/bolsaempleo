import {Component, OnInit} from '@angular/core';
import {Postulante} from '../../models/postulante';
import {FirebaseBDDService} from './../../services/firebase-bdd.service';
import {PostulanteService} from '../../services/postulante.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {catalogos} from '../../../environments/catalogos';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  postulante: Postulante;
  contrasena: string;
  confirmacion: string;
  nacionalidades: Array<any>;
  estadosCiviles: Array<any>;
  sexos: Array<any>;
  correoValido: boolean;
  claveValida: boolean;
  claveConfirmacionValida: boolean;

  constructor(private postulanteService: PostulanteService,
              private firebaseBDDService: FirebaseBDDService,
              public authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this.correoValido = false;
    this.claveValida = false;
    this.claveConfirmacionValida = false;
    this.nacionalidades = catalogos.nacionalidades;
    this.postulante = new Postulante();
    this.estadosCiviles = catalogos.estadosCiviles;
    this.sexos = catalogos.sexos;
  }

  estaCompleto(): boolean {
    if (!this.postulante.correoElectronico || !this.contrasena) {
      return false;
    }
    return true;
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

  validarFormulario(registro: Postulante): string {
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
    const validacion = this.validarFormulario(this.postulante);
    if (validacion === '') {
      this.postulante.nombreCompleto.toUpperCase();
      this.postulante.correoElectronico.toLowerCase();
      this.postulante.direccion.toUpperCase();
      this.authService.createUserWithEmailAndPassword(this.postulante.correoElectronico, this.contrasena)
        .then(x => {
          this.postulanteService.postulante = this.postulante;
          this.firebaseBDDService.firebaseControllerPostulantes.insertar(this.postulanteService.postulante);
          swal({
            position: 'center',
            type: 'success',
            title: 'Registro de postulante',
            text: 'Registro Satisfactorio',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigate(['/login']);
        }).catch(error => {
        swal({
          position: 'center',
          type: 'error',
          title: 'Registro de postulante',
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
