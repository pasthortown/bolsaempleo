import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  empresa: Empresa;
  contrasena: string;

  constructor() { }

  ngOnInit() {
  }
}
