import { Component, OnInit } from '@angular/core';
import { Postulante } from '../../models/postulante';
import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { PostulanteService } from '../../services/postulante.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  postulante = new Postulante();
  contrasena: string;
  confirmacion: string;

  constructor(private postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  estaCompleto(): boolean {
    // TODO : validar con HTML5 en la interfaz gráfica faltan otros campos obligatorios
    if (!this.postulante.correoElectronico || !this.contrasena) {
      return false;
    }
    return true;
  }

  sonIguales(): boolean {
    // TODO : validar con HTML5 en la interfaz gráfica
    if (!this.postulante || !this.contrasena) {
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
      alert('Datos incompletos');
      return false;
    }
    if (!this.sonIguales()) {
      alert('Contraseña no coincide con la confirmación');
      return false;
    }
    if (!this.esCompleja()) {
      alert('Contraseña debe ser más compleja');
      return false;
    }
    if (this.hayDuplicados()) {
      alert('Hay datos duplicados');
      return false;
    }
    return true;
  }

  registrar() {
    if (!this.esValido()) {
      return;
    }

    const resultado = this.firebaseBDDService.firebaseControllerPostulantes
      .querySimple('correoElectronico', this.postulante.correoElectronico);

    resultado.snapshotChanges().subscribe(items => {
      if (items.length > 0) {
        alert('Correo duplicado');
        return false;
      }

      this.authService.createUserWithEmailAndPassword(this.postulante.correoElectronico
        , this.contrasena).then(x => {
          this.postulanteService.postulante = this.postulante;
          this.firebaseBDDService.firebaseControllerPostulantes
            .insertar(this.postulanteService.postulante);
          // TODO : mensaje de éxito
          alert('Todo bien');
          this._router.navigate(['postulantes']);
        }).catch(error => {
          // TODO : mensaje de alerta
          alert(error.message);
          console.log(error);
        });
    });
  }
}
