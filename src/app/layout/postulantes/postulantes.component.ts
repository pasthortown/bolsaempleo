import { FirebaseBDDService } from './../../services/firebase-bdd.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {
  contadorPersonas: number;
  contadorEmpresas: number;

  constructor(private firebaseBDDService: FirebaseBDDService) { }

  ngOnInit() {
    this.contadorPersonas = 0;
    this.contadorEmpresas = 0;

    this.firebaseBDDService.firebaseControllerPostulantes.leer().snapshotChanges().subscribe(items => {
      this.contadorPersonas = items.length;
    });

    this.firebaseBDDService.firebaseControllerEmpresas.leer().snapshotChanges().subscribe(items => {
      this.contadorEmpresas = items.length;
    });
  }
}
