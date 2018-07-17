import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {EmpresaService} from '../../../services/empresa.service';

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto1: string;
  srcFoto2: string;
  srcFoto3: string;
  srcFoto4: string;

  constructor(private modalService: NgbModal, public empresaService: EmpresaService) {
  }

  ngOnInit() {
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

  open(content) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {

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

  delete() {
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
