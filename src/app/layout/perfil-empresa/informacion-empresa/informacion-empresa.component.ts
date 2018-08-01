import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaService} from '../../../services/empresa.service';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.css']
})
export class InformacionEmpresaComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto: string;

  constructor(public empresaService: EmpresaService, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.empresaService.empresa.naturaleza = '';
    this.srcFoto = 'assets/img/prueba/descarga.jpg';
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.empresaService.empresa.fotografia = 'data:' + file.type + ';base64,' + reader.result.split(',')[1];
      };
    }
  }


  insertar() {
    this.firebaseBDDService.firebaseControllerEmpresas.insertar(this.empresaService.empresa);
    swal({
      position: 'center',
      type: 'success',
      title: 'Actualizar',
      text: 'Actualización fue exitosa!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  actualizar() {
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


}
