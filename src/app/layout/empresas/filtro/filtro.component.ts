import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../../services/oferta.service';
import {EmpresaService} from '../../../services/empresa.service';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Oferta} from '../../../models/oferta';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  oferta: Oferta;
  ofertas: Array<Oferta>;
  areas: Array<any>;
  campoAmplioSeleccionado: string;
  campoEspecificoSeleccionado: string;
  flag: string;

  constructor(private modalService: NgbModal,
              public empresaService: EmpresaService,
              private firebaseBDDService: FirebaseBDDService,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.oferta = new Oferta();
    this.ofertas = new Array<Oferta>();
    this.leerOfertas();
    this.areas = catalogos.titulos;
  }

  leerOfertas() {
    this.ofertaService.ofertas = null;
    this.ofertaService.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getAll('idEmpresa', '-LHim59xdYSFrG47QOhg')
      .snapshotChanges().subscribe(items => {
      this.ofertas = [];
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        itemLeido.id = element.key;
        // this.ofertaService.ofertas.push(itemLeido);
        this.ofertas.push(itemLeido);
      });
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

  filtrarPorCampoAmplio(filtro) {
    this.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoAmplio', filtro.campo_amplio)
      .snapshotChanges().subscribe(items => {
      if (items.length === 0) {
        swal({
          position: 'center',
          type: 'info',
          title: 'No existen Ofertas',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }

  filtrarPorCampoEspecifico(filtro) {
    this.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoEspecifico', filtro.nombre)
      .snapshotChanges().subscribe(items => {

      if (items.length === 0) {
        swal({
          position: 'center',
          type: 'info',
          title: 'No existen Ofertas',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }
}
