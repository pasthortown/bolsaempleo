import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

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
