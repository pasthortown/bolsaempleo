import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { FirebaseBDDService } from '../../services/firebase-bdd.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresa = new Empresa();
  contrasena: string;
  confirmar: string;

  constructor(private empresaService: EmpresaService,
    private firebaseBDDService: FirebaseBDDService,
    public authService: AuthService) { }

  ngOnInit() {
  }

  existe(): boolean {
    const resultado = this.firebaseBDDService.firebaseControllerEmpresas
      .querySimple('correoElectronico', this.empresa.correoElectronico);
    if (resultado) {
      return true;
    }
    return false;
  }

  registrar() {
    // TODO : verificar datos obligatorios
    // TODO : verificar coincidencia entre contrasena y confirmar
    // TODO : verificar valores duplicados en la base de datos: identificacion, correo, razon social
    // if (!this.existe()) {
    this.authService.createUserWithEmailAndPassword(this.empresa.correoElectronico
      , this.contrasena).then(resultado => {
        this.empresaService.empresa = this.empresa;
        this.firebaseBDDService.firebaseControllerPostulantes
          .insertar(this.empresaService.empresa);
        // TODO : mensaje de alerta
      }).catch(error => {
        // TODO : mensaje de alerta
        alert(error.message);
        console.log(error);
      });
    // }
  }
}
