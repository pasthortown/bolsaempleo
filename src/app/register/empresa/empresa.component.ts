import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FirebaseBDDService } from '../../services/firebase-bdd.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresa = new Empresa();
  contrasena: string;
  confirmacion: string;

  constructor(private empresaService: EmpresaService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
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

    const resultado = this.firebaseBDDService.firebaseControllerEmpresas
      .querySimple('correoElectronico', this.empresa.correoElectronico);

    resultado.snapshotChanges().subscribe(items => {
      if (items.length > 0) {
        alert('Correo duplicado');
        return false;
      }

      this.authService.createUserWithEmailAndPassword(this.empresa.correoElectronico
        , this.contrasena).then(x => {
          this.empresaService.empresa = this.empresa;
          this.firebaseBDDService.firebaseControllerEmpresas
            .insertar(this.empresaService.empresa);
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
