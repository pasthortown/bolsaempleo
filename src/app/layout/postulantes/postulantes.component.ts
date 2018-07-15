import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content)
    .result
    .then((resultAceptar => {

    }), (resultCancel => {

    }));
  }
}
