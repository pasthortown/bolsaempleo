import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  correoElectronico: string;

  constructor(public authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  reiniciar() {
    if (!this.correoElectronico) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Validación',
        text: 'El correo es obligatorio',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    this.authService
      .reinicioClaveEnvioCorreo(this.correoElectronico, 'es')
      .then(function() {
        swal({
          position: 'center',
          type: 'success',
          title: 'Reinicio de contraseña',
          text:
            'Se ha enviado un enlace a tu correo electrónico para que reinicies tu contraseña',
          showConfirmButton: false,
          timer: 2000
        });
      })
      .catch(function(error) {
        swal({
          position: 'center',
          type: 'warning',
          title: 'Reinicio de contraseña',
          text:
            'Se produjo un error al enviar el correo electrónico de reinicio de contraseña',
          showConfirmButton: false,
          timer: 2000
        });
      });

    this._router.navigate(['login']);
  }
}
