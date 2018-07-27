import {ClasificacionEmpresas} from './../datos/clasificacion-empresas.enum';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {Oferta} from '../../models/oferta';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service';
import {OfertaService} from '../../services/oferta.service';
import {catalogos} from '../../../environments/catalogos';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  clasificacionEmpresas = ClasificacionEmpresas;
  contadorEmpresas: number;
  contadorPostulantes: number;
  contadorOfertas: number;

  constructor(private modalService: NgbModal, public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.contadorEmpresas = 0;
    this.contadorPostulantes = 0;
    this.leerOfertas();
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

  leerOfertas() {
    this.ofertaService.ofertas = null;
    this.ofertaService.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getAll('idEmpresa', '-LHim59xdYSFrG47QOhg')
      .snapshotChanges().subscribe(items => {
      this.ofertaService.ofertas = [];
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        itemLeido.id = element.key;
        this.ofertaService.ofertas.push(itemLeido);
      });
    });
  }

}
