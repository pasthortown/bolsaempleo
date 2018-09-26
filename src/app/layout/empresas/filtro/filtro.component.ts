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
import {Router} from '@angular/router';
import {PostulacionDiccionario} from '../../../models/miPostulacionDiccionario';
import {PostulanteService} from '../../../services/postulante.service';
import {Offer} from '../../../models/offer';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-filtro-ofertas',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filters: Array<String>;
  columns = new Array('code', 'province', 'specific_field', 'position', 'city', 'broad_field');
  operators = new Array('=', '=', 'like', 'like', 'like', '=');
  oferta: Oferta;
  ofertasAplicadas = [];
  postulacion: Postulacion;
  postulante: Postulante;
  ofertas: Array<Oferta>;
  areas: Array<any>;
  etiquetaPrincipal: string;
  criterioBusqueda: string;
  pagina = 0;
  registrosPorPagina = 10;
  totalPaginas = 1;
  campo = 'estudiosRealizados/0/tipo_titulo';

  offers: Array<Offer>;
  actual_page: number;
  records_per_page: number;
  total_pages: number;
  provinces: Array<any>;
  cantones: Array<any>;
  enable_city: boolean;
  camposEspecificos: Array<any>;
  filterFlag: boolean;

  constructor(private modalService: NgbModal,
              public ofertaService: OfertaService,
              private postulanteService: PostulanteService,
              private firebaseBDDService: FirebaseBDDService,
              public authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.provinces = catalogos.provincias;
    this.areas = catalogos.titulos;
    this.filters = new Array<String>();
    this.actual_page = 1;
    this.records_per_page = 5;
    this.total_pages = 1;
    this.getAllOffers();
    this.criterioBusqueda = '';
    this.postulante = this.authService.obtenerUsuario();
    this.postulacion = new Postulacion();
    this.oferta = new Oferta();
    this.paginacion(true);
    if (this.postulante != null) {
      this.getMisPostulaciones();
    }
  }

  getTotalPaginas() {
    const ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getAll().snapshotChanges().subscribe(items => {
      this.totalPaginas = Math.ceil(items.length / this.registrosPorPagina);
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        ofertas.push(itemLeido);
      });
      this.contarOfertasPorCampoAmplio(ofertas);
      this.contarOfertasPorCampoEspecifico(ofertas);
    });
  }

  paginacion(siguiente: boolean) {
    if (siguiente) {
      if (this.actual_page === this.total_pages) {
        return;
      } else {
        this.actual_page++;
      }
    } else {
      if (this.actual_page === 1) {
        return;
      } else {
        this.actual_page--;
      }
    }
    if (this.filters.length === 0) {
      this.getAllOffers();
    } else {
      this.filterOffers();
    }

  }

  leerOfertas() {
    this.firebaseBDDService.firebaseControllerOfertas.getAllAux()
      .snapshotChanges().subscribe(items => {
      this.ofertas = [];
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

  openFilter(content, item: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.oferta = item;
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (resultAceptar === 'aplicar') {
          this.filterOffers();
        }

      }), (resultCancel => {

      }));
  }

  filterOffers() {
    this.actual_page = 1;
    let condition = [];
    const conditions = [];
    for (let i = 0; i < this.filters.length; i++) {
      if (this.filters[i] != null && this.filters[i] !== '') {
        condition.push(this.columns[i]);
        condition.push(this.operators[i]);
        condition.push(this.filters[i]);
        conditions.push(condition);
        condition = [];
      }
    }
    this.ofertaService.filterOffers({'filters': {'conditions': conditions}}, this.actual_page, this.records_per_page).subscribe(
      response => {
        this.offers = response['offers']['data'];
        if (response['pagination']['total'] === 0) {
          swal({
            title: 'Oops! No encotramos lo que estás buscando',
            text: 'Intenta otra vez!',
            type: 'info',
            timer: 3500
          });
          this.total_pages = 1;
        } else {
          this.total_pages = response['pagination']['last_page'];
        }
      });
  }

  filterOffersSingle(column, item) {
    this.actual_page = 1;
    this.filters[0] = item;
    const condition = [];
    const conditions = [];
    condition.push(column);
    condition.push('like');
    condition.push(item);
    conditions.push(condition);
    this.ofertaService.filterOffers({'filters': {'conditions': conditions}}, this.actual_page, this.records_per_page).subscribe(
      response => {
        this.offers = response['offers']['data'];
        if (response['pagination']['total'] === 0) {
          swal({
            title: 'Oops! No encotramos lo que estás buscando',
            text: 'Intenta otra vez!',
            type: 'info',
            timer: 3500
          });
          this.total_pages = 1;
        } else {
          this.total_pages = response['pagination']['last_page'];
        }
      });
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

  borrarFiltro(filter) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.etiquetaPrincipal = '';
    if (this.filters.length === 0) {
      this.getAllOffers();
    } else {
      this.filterOffers();
    }

  }

  filtrarPorCargo() {
    this.ofertas = [];
    this.etiquetaPrincipal = this.criterioBusqueda;
    this.firebaseBDDService.firebaseControllerOfertas.querySimple('cargo', this.criterioBusqueda.toUpperCase())
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
    this.etiquetaPrincipal = filtro;
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoEspecifico', filtro)
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

  contarOfertasPorCampoAmplio(ofertas: Array<Offer>) {
    this.areas.forEach(area => {
      area.total = 0;
    });
    ofertas.forEach(oferta => {
      this.areas.forEach(area => {
        if (oferta.broad_field === area.campo_amplio) {
          area.total = area.total + 1;
        }
      });
    });
    /*
    this.ofertas = [];
    this.areas.forEach(value => {
      value.total = 0;
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
    */
  }

  contarOfertasPorCampoEspecifico(ofertas: Array<Offer>) {
    this.areas.forEach(area => {
      area.campos_especificos.forEach(areaEspecifica => {
        areaEspecifica.total = 0;
      });
    });
    ofertas.forEach(oferta => {
      this.areas.forEach(area => {
        area.campos_especificos.forEach(areaEspecifica => {
          if (oferta.specific_field === areaEspecifica.nombre) {
            areaEspecifica.total = areaEspecifica.total + 1;
          }
        });
      });
    });
  }

  validarSesion() {
    swal({
      title: 'Para ver más Información tiene que iniciar sesión como Profesional',
      text: '',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-sign-in" aria-hidden="true"> Iniciar Sesión</i>',
      cancelButtonText: '<i class="fa fa-address-book" aria-hidden="true"> Regístrate</i>'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login']);
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.router.navigate(['persona']);
      }
    });
  }

  getMisPostulaciones() {
    this.firebaseBDDService.firebaseControllerPostulaciones.filtroExacto('idPostulante', this.postulante.id)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        const postulacion: Postulacion = element.payload.val() as Postulacion;
        this.ofertasAplicadas.push(postulacion.idOferta);
      });
    });
  }

  aplicada(idOferta: string) {
    let toReturn = false;
    this.ofertasAplicadas.forEach(element => {
      if (element === idOferta) {
        toReturn = true;
      }
    });
    return toReturn;
  }

  getAllOffers(): void {
    this.ofertaService.getAllOffers(this.actual_page, this.records_per_page).subscribe(response => {
      this.offers = response['offers']['data'];
      this.contarOfertasPorCampoAmplio(this.offers);
      this.contarOfertasPorCampoEspecifico(this.offers);
      if (response['pagination']['total'] === 0) {
        this.total_pages = 1;
      } else {
        this.total_pages = response['pagination']['last_page'];
      }
    });
  }

  filtrarCantones(item) {
    this.cantones = [];
    this.enable_city = true;
    this.provinces.forEach(value => {
      if (item === value.provincia) {
        this.cantones = value.cantones;
      }
    });
  }

  filtrarCamposEspecificos(item) {
    this.camposEspecificos = [];
    this.areas.forEach(value => {
      if (item === value.campo_amplio) {
        this.camposEspecificos = value.campos_especificos;
      }
    });
  }
}
