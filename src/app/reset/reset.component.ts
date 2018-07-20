import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  correoElectronico: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  reiniciar() {
    if (!this.correoElectronico) {
      // TODO : mensaje de obligatoriedad del correo
    }
    this.authService.reinicioClaveEnvioCorreo(this.correoElectronico, 'es');
  }
}
