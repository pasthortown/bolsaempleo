import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {Oferta} from '../../models/oferta';
import swal from 'sweetalert2';
import {catalogos} from '../../../environments/catalogos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  contadorEmpresas: number;
  contadorPostulantes: number;
  contadorOfertas: number;
  totalOfertas: number;

  constructor(public router: Router,
              public authService: AuthService,
              private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.contarEmpresas();
    this.contarPostulantes();
    this.contarOfertas();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  contarEmpresas() {
    return this.firebaseBDDService.firebaseControllerEmpresas.getAll().snapshotChanges().subscribe(items => {
      this.contadorEmpresas = items.length;
    });

  }

  contarPostulantes() {
    return this.firebaseBDDService.firebaseControllerPostulantes.getAll().snapshotChanges().subscribe(items => {
      this.contadorPostulantes = items.length;
    });

  }

  contarOfertas() {
    return this.firebaseBDDService.firebaseControllerOfertas.getAll().snapshotChanges().subscribe(items => {
      this.contadorOfertas = items.length;
    });
  }

}
