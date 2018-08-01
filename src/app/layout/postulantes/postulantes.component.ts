import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {
  contadorPostulantes: number;
  contadorEmpresas: number;
  contadorOfertas: number;

  constructor(private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    this.contadorEmpresas = 0;
    this.contadorPostulantes = 0;
    this.contadorOfertas = 0;
    this.contarEmpresas();
    this.contarPostulantes();
    this.contarOfertas();
  }

  contarEmpresas() {
    return this.firebaseBDDService.firebaseControllerEmpresas.leer().snapshotChanges().subscribe(items => {
      this.contadorEmpresas = items.length;
    });

  }

  contarPostulantes() {
    return this.firebaseBDDService.firebaseControllerPostulantes.leer().snapshotChanges().subscribe(items => {
      this.contadorPostulantes = items.length;
    });

  }

  contarOfertas() {
    return this.firebaseBDDService.firebaseControllerOfertas.leer().snapshotChanges().subscribe(items => {
      this.contadorOfertas = items.length;
    });

  }
}
