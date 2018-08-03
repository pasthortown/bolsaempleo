import { Component, OnInit } from '@angular/core';
import { Postulante } from '../../models/postulante';
import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { PostulanteService } from '../../services/postulante.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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

  constructor(private postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this.nacionalidades = catalogos.nacionalidades;
    this.postulante = new Postulante();
  }

  estaCompleto(): boolean {
    if (!this.postulante.correoElectronico || !this.contrasena) {
      return false;
    }
    return true;
  }

  sonIguales(): boolean {
    if (!this.postulante || !this.contrasena) {
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
    return true;
  }

  registrar() {
    if (!this.esValido()) {
      return;
    }
    this.authService.createUserWithEmailAndPassword(this.postulante.correoElectronico, this.contrasena).then(x => {
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
  }
}
