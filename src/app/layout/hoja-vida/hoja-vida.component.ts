import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.css']
})
export class HojaVidaComponent implements OnInit {
  fecha: Date;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    console.log(this.fecha);
    this.modalService.open(content)
    .result
    .then((resultAceptar => {

    }), (resultCancel => {

    }));
  }

}
