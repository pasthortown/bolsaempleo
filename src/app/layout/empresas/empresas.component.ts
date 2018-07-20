import {ClasificacionEmpresas} from './../datos/clasificacion-empresas.enum';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {Oferta} from '../../models/oferta';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  clasificacionEmpresas = ClasificacionEmpresas;
  contadorEmpresas: number;
  contadorPostulantes: number;
  oferta: Oferta;

  constructor(private modalService: NgbModal, public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.oferta = new Oferta();
    this.contadorEmpresas = 0;
    this.contadorPostulantes = 0;
    this.leer();
    this.contarEmpresas();
    this.contarPostulantes();
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

  openOfertaLaboral(content, item: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    if (editar) {
      this.oferta = item;
    } else {
      this.oferta = new Oferta();
    }
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (!editar) {
          // this.agregarOferta();
        }
        // this.actualizar();
      }), (resultCancel => {

      }));
  }

  leer() {
    this.empresaService.empresa.id = '-LHnYYcnqIEj4yUV4izj';
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
