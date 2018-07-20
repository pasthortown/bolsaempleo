import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {EmpresaService} from '../../../services/empresa.service';
import {Oferta} from '../../../models/oferta';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Idioma} from '../../../models/idioma';

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  oferta: Oferta;
  srcFoto1: string;
  srcFoto2: string;
  srcFoto3: string;
  srcFoto4: string;

  constructor(private modalService: NgbModal, public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.oferta = new Oferta();
    this.srcFoto1 = 'assets/img/prueba/empresa1.png';
    this.srcFoto2 = 'assets/img/prueba/empresa2.png';
    this.srcFoto3 = 'assets/img/prueba/empresa3.png';
    this.srcFoto4 = 'assets/img/prueba/empresa4.png';
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
      this.oferta = item;
    } else {
      this.oferta = new Oferta();
    }
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (!editar) {
          this.agregarOferta();
        }
        this.actualizar();
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

  insertar() {
    this.agregarOferta();
    this.empresaService.empresa.id = '-LHnYYcnqIEj4yUV4izj';
    this.firebaseBDDService.firebaseControllerEmpresas.insertar(this.empresaService.empresa);
    swal({
      position: 'center',
      type: 'success',
      title: 'Insertar',
      text: 'Registro exitoso!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  agregarOferta() {
    if ( this.empresaService.empresa.oferta == null ) {
      this.empresaService.empresa.oferta = [];
    }
    this.empresaService.empresa.oferta.push(this.oferta);
    this.oferta = new Oferta();
  }

  actualizar() {
    this.empresaService.empresa.id = '-LHnYYcnqIEj4yUV4izj';
    this.firebaseBDDService.firebaseControllerEmpresas.actualizar(this.empresaService.empresa);
    swal({
      position: 'center',
      type: 'success',
      title: 'Actualizar',
      text: 'Actualización fue exitosa!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  borrar(item) {
    const ofertas = [];
    swal({
      title: '¿Está seguro de Eliminar?',
      text: 'Empleador',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.empresaService.empresa.oferta.forEach(element => {
          if (element !== item) {
            ofertas.push(element);
          }
        });
        this.empresaService.empresa.oferta = ofertas;
        this.firebaseBDDService.firebaseControllerEmpresas.borrar(this.empresaService.empresa);
        swal(
          'Eliminado!',
          'Su registro fue eliminado.',
          'success'
        );
      } else {
        swal(
          'Eliminado!',
          'Su registro no fue eliminado.',
          'error'
        );
      }
    });
  }
}
