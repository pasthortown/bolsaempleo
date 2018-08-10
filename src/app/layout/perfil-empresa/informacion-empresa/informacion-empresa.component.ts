import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaService} from '../../../services/empresa.service';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import swal from 'sweetalert2';
import {Empresa} from '../../../models/empresa';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.css']
})
export class InformacionEmpresaComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto: string;
  empresa: Empresa;

  constructor(public empresaService: EmpresaService,
              private authService: AuthService,
              private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.empresa = new Empresa();
    this.srcFoto = 'assets/img/prueba/descarga.jpg';
    this.empresaService.empresa = this.authService.usuarioNegocio as Empresa;
    this.leerEmpresa();
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

  actualizar() {
    this.empresaService.empresa.nombreComercial = this.empresaService.empresa.nombreComercial.toUpperCase();
    this.empresaService.empresa.paginaWeb = this.empresaService.empresa.paginaWeb.toLowerCase();
    this.empresaService.empresa.correoElectronico = this.empresaService.empresa.correoElectronico.toLowerCase();
    this.empresaService.empresa.direccion = this.empresaService.empresa.direccion.toUpperCase();
    this.empresaService.empresa.actividadEconomica = this.empresaService.empresa.actividadEconomica.toUpperCase();
    this.firebaseBDDService.firebaseControllerEmpresas.actualizar(this.empresaService.empresa);
    swal({
      position: 'center',
      type: 'success',
      title: 'Datos Personales',
      text: 'Actualización fue exitosa!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  leerEmpresa() {
    this.firebaseBDDService.firebaseControllerEmpresas.getId('id', this.empresaService.empresa.id)
      .snapshotChanges().subscribe(items => {
      this.empresa = new Empresa();
      items.forEach(element => {
        this.empresa = element.payload.val() as Empresa;
      });
    });
  }

}
