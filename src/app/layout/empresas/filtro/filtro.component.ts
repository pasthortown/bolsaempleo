import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../../services/oferta.service';
import {EmpresaService} from '../../../services/empresa.service';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Oferta} from '../../../models/oferta';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import {Postulacion} from '../../../models/postulacion';
import {AuthService} from '../../../services/auth.service';
import {Postulante} from '../../../models/postulante';

@Component({
  selector: 'app-filtro-ofertas',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  oferta: Oferta;
  postulacion: Postulacion;
  postulante: Postulante;
  ofertas: Array<Oferta>;
  areas: Array<any>;
  etiquetaPrincipal: string;
  etiquetaSecundaria: string;
  campoAmplioSeleccionado: string;
  campoEspecificoSeleccionado: string;
  flag: string;
  criterioBusqueda: string;

  constructor(private modalService: NgbModal,
              public empresaService: EmpresaService,
              private firebaseBDDService: FirebaseBDDService,
              private authService: AuthService,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.criterioBusqueda = '';
    this.postulante = this.authService.obtenerUsuario();
    this.postulacion = new Postulacion();
    this.oferta = new Oferta();
    this.areas = catalogos.titulos;
    this.ofertas = new Array<Oferta>();
    this.leerOfertas();
    this.contarOfertasPorCampoAmplio();
    this.contarOfertasPorCampoEspecifico();
  }

  leerOfertas() {
    this.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getAll()
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

  openOfertaLaboral(content, item: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    console.log(item);
    this.oferta = item;
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (resultAceptar === 'aplicar') {
          this.aplicarOferta(item);
        }

      }), (resultCancel => {

      }));
  }

  aplicarOferta(oferta) {
    this.postulacion.idPostulante = this.postulante.id;
    this.postulacion.idOferta = oferta.id;

    swal({
      title: '¿Está seguro de Aplicar?',
      text: oferta.cargo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.firebaseBDDService.firebaseControllerPostulaciones.insertar(this.postulacion);
        swal({
          title: 'Oferta Aplicada',
          text: 'Aplicación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  borrarFiltro() {
    this.etiquetaPrincipal = '';
    this.leerOfertas();
  }

  filtrarPorCargo() {
    this.ofertas = [];
    this.etiquetaPrincipal = this.criterioBusqueda;
    this.firebaseBDDService.firebaseControllerOfertas.querySimple('cargo', this.criterioBusqueda)
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

  filtrarPorCampoAmplio(filtro) {
    this.ofertas = [];
    this.etiquetaPrincipal = filtro;
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoAmplio', filtro)
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
    this.etiquetaPrincipal = filtro.nombre;
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

  contarOfertasPorCampoAmplio() {
    this.ofertas = [];
    this.areas.forEach(value => {
      this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoAmplio', value.campo_amplio)
        .snapshotChanges().subscribe(items => {
        items.forEach(element => {
          let itemLeido: Oferta;
          itemLeido = element.payload.val() as Oferta;
          if (value.campo_amplio === itemLeido.campoAmplio) {
            value.total = items.length;
          }
        });
      });
    });
  }

  contarOfertasPorCampoEspecifico() {
    this.ofertas = [];
    this.areas.forEach(value => {
      value.campos_especificos.forEach(campoEspecifico => {
        this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoEspecifico', campoEspecifico.nombre)
          .snapshotChanges().subscribe(items => {
          items.forEach(element => {
            let itemLeido: Oferta;
            itemLeido = element.payload.val() as Oferta;
            console.log(campoEspecifico.nombre);
            console.log(itemLeido.campoEspecifico);
            if (campoEspecifico.nombre === itemLeido.campoEspecifico) {
              campoEspecifico.total = items.length;
            }
          });
        });
      });
    });
  }
}
