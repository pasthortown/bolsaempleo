import { AuthService } from './../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {OfertaService} from '../../services/oferta.service';
import {Oferta} from '../../models/oferta';

@Component({
  selector: 'app-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {
  contadorEmpresas: number;

  constructor(public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.contadorEmpresas = 0;
  }

}
