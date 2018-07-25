import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {EmpresaService} from '../../../services/empresa.service';
import {Oferta} from '../../../models/oferta';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Idioma} from '../../../models/idioma';
import {OfertaService} from '../../../services/oferta.service';

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

  constructor(private modalService: NgbModal, public ofertaService: OfertaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.oferta = new Oferta();
    this.srcFoto1 = 'assets/img/prueba/empresa1.png';
    this.srcFoto2 = 'assets/img/prueba/empresa2.png';
    this.srcFoto3 = 'assets/img/prueba/empresa3.png';
    this.srcFoto4 = 'assets/img/prueba/empresa4.png';
    this.leerOfertas();
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
        if (editar) {
          this.actualizar();
        } else {
          this.insertar();
          this.agregarOferta();
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
    this.modalService.open(content)
      .result
      .then((resultAceptar => {

      }), (resultCancel => {

      }));
  }

  insertar() {
    // this.ofertaService.ofertas.idEmpresa = '-LHnYYcnqIEj4yUV4izj';
    this.oferta.idEmpresa = '-LHim59xdYSFrG47QOhg';
    this.firebaseBDDService.firebaseControllerOfertas.insertar(this.oferta);
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
        this.firebaseBDDService.firebaseControllerOfertas.borrar(item);
        swal(
          'Eliminado!',
          'Su registro fue eliminado.',
          'success'
        );
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
}
