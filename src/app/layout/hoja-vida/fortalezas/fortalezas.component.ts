import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fortalezas',
  templateUrl: './fortalezas.component.html',
  styleUrls: ['./fortalezas.component.css']
})
export class FortalezasComponent implements OnInit {

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
  }

}
