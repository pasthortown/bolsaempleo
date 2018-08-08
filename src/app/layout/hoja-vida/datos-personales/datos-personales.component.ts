import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {catalogos} from '../../../../environments/catalogos';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto: string;
  nacionalidades: Array<any>;
  estadosCiviles: Array<any>;
  sexos: Array<any>;
  constructor(public postulanteService: PostulanteService) {
  }

  ngOnInit() {
    this.nacionalidades = catalogos.nacionalidades;
    this.estadosCiviles = catalogos.estadosCiviles;
    this.sexos= catalogos.sexos;
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.postulanteService.postulante.fotografia = 'data:' + file.type + ';base64,' + reader.result.split(',')[1];
      };
    }
  }
}
