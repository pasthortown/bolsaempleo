import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaService} from '../../../services/empresa.service';

@Component({
  selector: 'app-informacion-empresa',
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.css']
})
export class InformacionEmpresaComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto: string;

  constructor(public empresaService: EmpresaService) {
  }

  ngOnInit() {
    this.srcFoto = 'assets/img/prueba/descarga.jpg';
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcFoto = 'data:' + file.type + ';base64,' + reader.result.split(',')[1];
      };
    }
  }
}
