import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {EmpresaService} from '../../../services/empresa.service';
import {Oferta} from '../../../models/oferta';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {catalogos} from '../../../../environments/catalogos';
import {Professional} from '../../../models/professional';
import {AuthService} from '../../../services/auth.service';
import {Offer} from '../../../models/offer';
import {User} from '../../../models/user';

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  ofertaSeleccionada: Offer;
  duracionOferta: number;
  areas: Array<any>;
  provincias: Array<any>;
  cantones: Array<any>;
  camposEspecificos: Array<any>;
  habilitarCamposEspecificos: boolean;
  habilitarCantones: boolean;

  actual_page: number;
  total_pages: number;
  offers: Array<Offer>;
  professionals: Array<Professional>;
  selectedOffer: Offer;
  userLogged: User;

  constructor(public empresaService: EmpresaService,
              private modalService: NgbModal,
              private firebaseBDDService: FirebaseBDDService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.userLogged = JSON.parse(sessionStorage.getItem('user_logged')) as User;
    this.offers = new Array<Offer>();
    this.selectedOffer = new Offer();
    this.actual_page = 1;
    this.total_pages = 5;
    this.duracionOferta = 0;
    this.habilitarCamposEspecificos = false;
    this.habilitarCantones = false;
    this.ofertaSeleccionada = new Offer();
    this.areas = catalogos.titulos;
    this.provincias = catalogos.provincias;
    this.getOffers();
  }


  calcularFechaFinOferta() {

  }

  openOfertaLaboral(content, offer: Offer, editar) {
    const errores = this.validarCamposObligatorios(this.selectedOffer);
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    if (editar) {
      this.selectedOffer = offer;
      this.filtrarCamposEspecificos(offer);
      this.filtrarCantones(offer);
    } else {
      this.selectedOffer = new Offer();
    }

    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (true) {
          if (resultAceptar === 'save') {
            if (editar) {
              this.updateOffer(this.selectedOffer);
            } else {
              this.createOffer(this.selectedOffer);
            }
          }
        } else {
        }
      }), (resultCancel => {

      }));
  }

  compararFechas(fechaMenor: any, fechaMayor: any): boolean {
    const fechaInicio = new Date(fechaMenor.year + '/' + fechaMenor.month + '/' + fechaMenor.day);
    const fechaFin = new Date(fechaMayor.year + '/' + fechaMayor.month + '/' + fechaMayor.day);
    if (fechaFin < fechaInicio) {
      swal({
        position: 'center',
        type: 'warning',
        title: 'Datos Incorrectos',
        text: 'Hay un error en las fechas ingresadas.',
        showConfirmButton: false,
        timer: 2000
      });
      return false;
    }
    return true;
  }

  openFiltro(content) {
    this.modalService.open(content)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  openPostulantes(content, offer: Offer) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.getProfessionals(offer.id);
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  filtrarCantones(item) {
    this.cantones = [];
    this.habilitarCantones = true;
    this.provincias.forEach(value => {
      if (item.province === value.provincia) {
        this.cantones = value.cantones;
      }
    });
  }

  filtrarCamposEspecificos(item) {
    this.camposEspecificos = [];
    this.habilitarCamposEspecificos = true;
    this.areas.forEach(value => {
      if (item.broad_field === value.campo_amplio) {
        this.camposEspecificos = value.campos_especificos;
      }
    });
  }

  validarCamposObligatorios(oferta: Offer): string {
    let errores = 'save';
    if (oferta.code == null || oferta.code === '') {
      errores = errores + 'Código';
    }
    // if (oferta.contacto == null || oferta.contacto == '') {errores = errores + ', Contacto';}
    // if (oferta.correoElectronico == null || oferta.correoElectronico == '') {errores = errores + ', Correo Electrónico';}
    return errores;
  }

  getOffers(): void {
    this.empresaService.getOffers(this.actual_page, this.total_pages, this.userLogged.user_id, this.userLogged.api_token).subscribe(
      response => {
        this.offers = response['offers']['data'];
      },
      error => {
        if (error.status === 401) {
          swal({
            position: 'center',
            type: 'error',
            title: 'Usuario y/o Contraseña incorrectas',
            text: 'Vuelva a intentar',
            showConfirmButton: true
          });
        }
      });
  }

  getProfessionals(offer_id: number): void {
    this.empresaService.getProfessionals(this.actual_page, this.total_pages, offer_id, this.userLogged.api_token).subscribe(
      response => {
        this.professionals = response['professionals']['data'];
      },
      error => {
        if (error.status === 401) {
          swal({
            position: 'center',
            type: 'error',
            title: 'Usuario y/o Contraseña incorrectas',
            text: 'Vuelva a intentar',
            showConfirmButton: true
          });
        }
      });
  }

  createOffer(offer: Offer): void {
    this.empresaService.createOffer({'company': this.userLogged, 'offer': this.selectedOffer}, this.userLogged.api_token).subscribe(
      response => {
        swal({
          position: 'center',
          type: 'success',
          title: 'Sus datos fueron ingresados correctamente',
          text: '',
          showConfirmButton: true
        });
        this.getOffers();
      },
      error => {
        if (error.status === 401) {
          swal({
            position: 'center',
            type: 'error',
            title: 'Usuario y/o Contraseña incorrectas',
            text: 'Vuelva a intentar',
            showConfirmButton: true
          });
        }
      });
  }

  updateOffer(offer: Offer): void {

    this.empresaService.updateOffer({'offer': this.selectedOffer}, this.userLogged.api_token).subscribe(
      response => {
        this.getOffers();
        swal({
          position: 'center',
          type: 'success',
          title: 'Sus datos fueron actualizados correctamente',
          text: '',
          timer: 2000,
          showConfirmButton: true
        });
      },
      error => {
        if (error.status === 401) {
          swal({
            position: 'center',
            type: 'error',
            title: 'Usuario y/o Contraseña incorrectas',
            text: 'Vuelva a intentar',
            showConfirmButton: true
          });
        }
      });
  }

  deleteOffer(offer: Offer): void {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: 'Cargo: ' + offer.position,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.empresaService.deleteOffer(offer.id, this.userLogged.api_token).subscribe(
          response => {
            this.getOffers();
          },
          error => {
            if (error.status === 401) {
              swal({
                position: 'center',
                type: 'error',
                title: 'Usuario y/o Contraseña incorrectas',
                text: 'Vuelva a intentar',
                showConfirmButton: true
              });
            }
          });
        swal({
          title: 'Oferta',
          text: 'Eliminación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }
}
