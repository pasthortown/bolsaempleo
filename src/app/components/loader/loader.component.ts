import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  // @ViewChild('modalLoader') modalLoader: ElementRef;
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

}
