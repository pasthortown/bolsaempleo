import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  srcFoto: string;

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
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
