import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {EmpresaService} from '../../../services/empresa.service';
import {Oferta} from '../../../models/oferta';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Idioma} from '../../../models/idioma';
import {OfertaService} from '../../../services/oferta.service';
import {catalogos} from '../../../../environments/catalogos';
import {isUpperCase} from 'tslint/lib/utils';
import {Postulacion} from '../../../models/postulacion';
import {Postulante} from '../../../models/postulante';
import {Empresa} from '../../../models/empresa';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  empresa: Empresa;
  ofertaSeleccionada: Oferta;
  ofertas: Array<Oferta>;
  postulantes: Array<Postulante>;
  postulaciones: Array<Postulacion>;
  duracionOferta: number;
  areas: Array<any>;
  provincias: Array<any>;
  cantones: Array<any>;
  camposEspecificos: Array<any>;
  habilitarCamposEspecificos: boolean;
  habilitarCantones: boolean;

  constructor(private modalService: NgbModal, public ofertaService: OfertaService, private firebaseBDDService: FirebaseBDDService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.duracionOferta = 0;
    this.empresa = this.authService.usuarioNegocio as Empresa;
    this.habilitarCamposEspecificos = false;
    this.habilitarCantones = false;
    this.ofertaSeleccionada = new Oferta();
    this.leerOfertas();
    this.areas = catalogos.titulos;
    this.provincias = catalogos.provincias;
  }

  filtrarCantones(item) {
    this.cantones = [];
    this.habilitarCantones = true;
    this.provincias.forEach(value => {
      if (item.provincia === value.provincia) {
        this.cantones = value.cantones;
      }
    });
  }

  calcularFechaFinOferta() {
    const fecha =
      this.ofertaSeleccionada.inicioPublicacion.year
      + '-' + this.ofertaSeleccionada.inicioPublicacion.month
      + '-' + this.ofertaSeleccionada.inicioPublicacion.day;
    const fechaInicio = new Date(fecha);
    fechaInicio.setDate(fechaInicio.getDate() + this.duracionOferta);
    this.ofertaSeleccionada.finPublicacion.year = fechaInicio.getFullYear();
    this.ofertaSeleccionada.finPublicacion.month = fechaInicio.getMonth();
    this.ofertaSeleccionada.finPublicacion.day = fechaInicio.getDate();

  }

  openOfertaLaboral(content, oferta: Oferta, editar) {
    const errores = this.validarCamposObligatorios(this.ofertaSeleccionada);
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    if (editar) {
      this.filtrarCamposEspecificos(oferta);
      this.filtrarCantones(oferta);
      this.ofertaSeleccionada = oferta;
    } else {
      this.ofertaSeleccionada = new Oferta();
    }

    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (true) {
          if (resultAceptar === 'save') {
            if (!this.compararFechas(this.ofertaSeleccionada.inicioPublicacion, this.ofertaSeleccionada.finPublicacion)) {
              return;
            }
            if (editar) {
              this.actualizar();
            } else {
              this.insertar();
              this.agregarOferta();
            }
            this.ordenarPorAntiguedad(true);
          }
        } else {
        }
      }), (resultCancel => {

      }));
  }

  ordenarPorAntiguedad(descendente: boolean) {
    this.ofertaService.ofertas.sort((n1, n2) => {
      const fechaInicio = new Date(n1.inicioPublicacion.year + '/' + n1.inicioPublicacion.month + '/' + n1.inicioPublicacion.day);
      const fechaFin = new Date(n2.inicioPublicacion.year + '/' + n2.inicioPublicacion.month + '/' + n2.inicioPublicacion.day);
      if (fechaFin > fechaInicio) {
        if (descendente) {
          return 1;
        } else {
          return -1;
        }
      }
      if (fechaFin < fechaInicio) {
        if (descendente) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
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

  openPostulantes(content, oferta: Oferta) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.leerPostulaciones(oferta);
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  insertar() {
    this.ofertaSeleccionada.idEmpresa = this.empresa.id;
    this.ofertaSeleccionada.codigo = this.ofertaSeleccionada.codigo.toUpperCase();
    this.ofertaSeleccionada.contacto = this.ofertaSeleccionada.contacto.toUpperCase();
    this.ofertaSeleccionada.correoElectronico = this.ofertaSeleccionada.correoElectronico.toUpperCase();
    this.ofertaSeleccionada.cargo = this.ofertaSeleccionada.cargo.toUpperCase();
    this.ofertaSeleccionada.actividades = this.ofertaSeleccionada.actividades.toUpperCase();
    if (this.ofertaSeleccionada.informacionAdicional != null) {
      this.ofertaSeleccionada.informacionAdicional = this.ofertaSeleccionada.informacionAdicional.toUpperCase();
    }
    this.firebaseBDDService.firebaseControllerOfertas.insertar(this.ofertaSeleccionada);
    swal({
      position: 'center',
      type: 'success',
      title: 'Oferta Laboral',
      text: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  agregarOferta() {
    if (this.ofertaService.ofertas == null) {
      this.ofertaService.ofertas = [];
    }
    this.ofertaService.ofertas.push(this.ofertaSeleccionada);
    this.ofertaSeleccionada = new Oferta();
  }

  actualizar() {
    this.ofertaSeleccionada.codigo = this.ofertaSeleccionada.codigo.toUpperCase();
    this.ofertaSeleccionada.contacto = this.ofertaSeleccionada.contacto.toUpperCase();
    this.ofertaSeleccionada.correoElectronico = this.ofertaSeleccionada.correoElectronico.toUpperCase();
    this.ofertaSeleccionada.cargo = this.ofertaSeleccionada.cargo.toUpperCase();
    this.ofertaSeleccionada.actividades = this.ofertaSeleccionada.actividades.toUpperCase();
    this.ofertaSeleccionada.informacionAdicional = this.ofertaSeleccionada.informacionAdicional.toUpperCase();
    this.firebaseBDDService.firebaseControllerOfertas.actualizar(this.ofertaSeleccionada);
    swal({
      position: 'center',
      type: 'success',
      title: 'Oferta',
      text: 'Actualización exitosa!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  borrar(item) {
    const ofertas = [];
    swal({
      title: '¿Está seguro de Eliminar?',
      text: 'Cargo: ' + item.cargo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.firebaseBDDService.firebaseControllerOfertas.borrar(item);
        swal({
          title: 'Oferta',
          text: 'Eliminación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  leerOfertas() {
    this.firebaseBDDService.firebaseControllerOfertas.getId('idEmpresa', this.empresa.id)
      .snapshotChanges().subscribe(items => {
      this.ofertaService.ofertas = [];
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        if (itemLeido.id === '0') {
          itemLeido.id = element.key;
          this.firebaseBDDService.firebaseControllerOfertas.actualizar(itemLeido);
        }
        this.ofertaService.ofertas.push(itemLeido);
        console.log(this.ofertaService);
      });
    });
  }

  filtrarCamposEspecificos(item) {
    this.camposEspecificos = [];
    this.habilitarCamposEspecificos = true;
    this.areas.forEach(value => {
      if (item.campoAmplio === value.campo_amplio) {
        this.camposEspecificos = value.campos_especificos;
      }
    });
  }

  validarCamposObligatorios(oferta: Oferta): string {
    let errores = 'save';
    if (oferta.codigo == null || oferta.codigo === '') {
      errores = errores + 'Código';
    }
    // if (oferta.contacto == null || oferta.contacto == '') {errores = errores + ', Contacto';}
    // if (oferta.correoElectronico == null || oferta.correoElectronico == '') {errores = errores + ', Correo Electrónico';}
    return errores;
  }

  leerPostulaciones(oferta: Oferta) {
    this.postulaciones = [];
    this.firebaseBDDService.firebaseControllerPostulaciones.filtroExacto('idOferta', oferta.id)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulacion;
        itemLeido = element.payload.val() as Postulacion;
        itemLeido.id = element.key;
        this.postulaciones.push(itemLeido);
      });
      this.leerPostulantes();
    });
  }

  leerPostulantes() {
    this.postulantes = [];
    this.postulaciones.forEach(value => {
      console.log(value.idPostulante);
      this.firebaseBDDService.firebaseControllerPostulantes.filtroExacto('id', value.idPostulante)
        .snapshotChanges().subscribe(items => {
        items.forEach(element => {
          console.log('entro');
          let itemLeido: Postulante;
          itemLeido = element.payload.val() as Postulante;
          itemLeido.id = element.key;
          this.postulantes.push(itemLeido);
        });
      });
    });

  }

}
