import {ClasificacionEmpresas} from './../datos/clasificacion-empresas.enum';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {Oferta} from '../../models/oferta';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service';
import {OfertaService} from '../../services/oferta.service';

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
  ofertas: Array<Empresa>;
  ofertas2: Array<Oferta>;
  filtro: Array<any>;
  flag: string;

  constructor(private modalService: NgbModal, public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {

    this.oferta = new Oferta();
    this.ofertas = new Array<Empresa>();
    this.ofertas2 = new Array<Oferta>();
    this.contadorEmpresas = 0;
    this.contadorPostulantes = 0;
    this.leerOfertas();
    this.contarEmpresas();
    this.contarPostulantes();
    // this.filtro = catalogos.titulos;
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

  leer2() {
    this.firebaseBDDService.firebaseControllerEmpresas.getAll('inicioPublicacion', 'as')
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Empresa;
        itemLeido = element.payload.val() as Empresa;

        /*itemLeido.oferta.forEach(value => {
          this.ofertas2.push(value);
          console.log('oferta');
          console.log(this.ofertas2);
        });
*/
      });
    });
  }

  leer3() {
    this.firebaseBDDService.firebaseControllerEmpresas.getAll('inicioPublicacion', 'asd')
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Empresa;
        itemLeido = element.payload.val() as Empresa;

        /*        itemLeido.oferta.forEach(value => {
                  this.ofertas2.push(value);
                  console.log('oferta');
                  console.log(this.ofertas2);
                });*/

      });
    });
  }
}
