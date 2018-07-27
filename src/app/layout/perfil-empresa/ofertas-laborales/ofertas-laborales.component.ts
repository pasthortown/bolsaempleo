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

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  oferta: Oferta;
  ofertas: Array<Oferta>;
  srcFoto1: string;
  srcFoto2: string;
  srcFoto3: string;
  srcFoto4: string;
  areas: Array<any>;
  provincias: Array<any>;
  cantones: Array<any>;
  camposEspecificos: Array<any>;
  habilitarCamposEspecificos: boolean;
  habilitarCantones: boolean;

  constructor(private modalService: NgbModal, public ofertaService: OfertaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.habilitarCamposEspecificos = false;
    this.habilitarCantones = false;
    this.oferta = new Oferta();
    this.srcFoto1 = 'assets/img/prueba/empresa1.png';
    this.srcFoto2 = 'assets/img/prueba/empresa2.png';
    this.srcFoto3 = 'assets/img/prueba/empresa3.png';
    this.srcFoto4 = 'assets/img/prueba/empresa4.png';
    this.leerOfertas();
    this.areas = catalogos.titulos;
    this.provincias = catalogos.provincias;
  }

  filtrarCantones(item) {
    this.cantones = [];
    this.habilitarCantones = true;
    this.provincias.forEach(value => {
      if (item.provincia == value.provincia) {
        this.cantones = value.cantones;
      }
    });
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcFoto1 = 'data:' + file.type + ';base64,' + reader.result.split(',')[1];
      };
    }
  }

  openOfertaLaboral(content, item: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    if (editar) {
      this.filtrarCamposEspecificos(item);
      this.oferta = item;
    } else {
      // this.oferta = new Oferta();
    }
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        const errores = this.validarCamposObligatorios(this.oferta);
        if (errores == '') {
          if (resultAceptar === 'save') {
            if (editar) {
              this.actualizar();
            } else {
              this.insertar();
              this.agregarOferta();
            }
          }
        } else {
          swal({
            position: 'center',
            type: 'error',
            title: 'Los siguientes campos son requeridos:!',
            text: errores,
            showConfirmButton: true,
            timer: 15000
          });
        }
      }), (resultCancel => {

      }));
  }

  openFiltro(content) {
    this.modalService.open(content)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  openPostulantes(content) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  insertar() {
    this.oferta.idEmpresa = '-LHim59xdYSFrG47QOhg';
    this.firebaseBDDService.firebaseControllerOfertas.insertar(this.oferta);
    swal({
      position: 'center',
      type: 'success',
      title: 'Oferta Creada',
      text: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
    });

  }

  agregarOferta() {
    if (this.ofertaService.ofertas == null) {
      this.ofertaService.ofertas = [];
    }
    this.ofertaService.ofertas.push(this.oferta);
    this.oferta = new Oferta();
  }

  actualizar() {
    this.firebaseBDDService.firebaseControllerOfertas.actualizar(this.oferta);
    swal({
      position: 'center',
      type: 'success',
      title: 'Oferta Actualizada',
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
          title: 'Oferta Eliminada',
          text: 'Eliminación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
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

  filtrarCamposEspecificos(item) {
    this.camposEspecificos = [];
    this.habilitarCamposEspecificos = true;
    this.areas.forEach(value => {
      if (item.campoAmplio == value.campo_amplio) {
        this.camposEspecificos = value.campos_especificos;
      }
    });
  }

  validarCamposObligatorios(oferta: Oferta): string {
    let errores = '';
    if (oferta.codigo == null || oferta.codigo == '') {
      errores = errores + 'Código';
    }
    if (oferta.contacto == null || oferta.contacto == '') {
      errores = errores + ', Contacto';
    }
    if (oferta.correoElectronico == null || oferta.correoElectronico == '') {
      errores = errores + ', Correo Electrónico';
    }
    return errores;
  }
}
