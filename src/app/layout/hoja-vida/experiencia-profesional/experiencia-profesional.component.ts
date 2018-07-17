import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiencia-profesional',
  templateUrl: './experiencia-profesional.component.html',
  styleUrls: ['./experiencia-profesional.component.css']
})
export class ExperienciaProfesionalComponent implements OnInit {

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
  }

}
