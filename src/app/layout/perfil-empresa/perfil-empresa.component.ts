import {Component, OnInit} from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {

  constructor(public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.leer();
  }

  leer() {
    this.empresaService.empresa.id = '-LHi9j3SRUU-NmEb9lgT';
    this.firebaseBDDService.firebaseControllerEmpresas.querySimple('id', this.empresaService.empresa.id)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Empresa;
        itemLeido = element.payload.val() as Empresa;
        itemLeido.id = element.key;
        this.empresaService.empresa = itemLeido;
      });
    });
  }
}
