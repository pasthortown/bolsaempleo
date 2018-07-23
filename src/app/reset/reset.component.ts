import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  correoElectronico: string;

  constructor(public authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
  }

  reiniciar() {
    if (!this.correoElectronico) {
      // TODO : mensaje de obligatoriedad del correo
      alert('El correo es obligatorio');
      return;
    }
    this.authService.reinicioClaveEnvioCorreo(this.correoElectronico, 'es');
    alert('Se ha enviado un enlace a tu correo electrónico para que reinicies tu contraseña');
    this._router.navigate(['login']);
  }
}
