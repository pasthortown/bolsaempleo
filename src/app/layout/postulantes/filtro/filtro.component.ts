import { catalogos } from './../../../../environments/catalogos';
import { FirebaseBDDService } from './../../../services/firebase-bdd.service';
import { Postulante } from './../../../models/postulante';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filtro: Array<any>;
  tipoTituloSeleccionado = '';
  tituloSeleccionado = '';
  criterioBusqueda = '';
  tipo_titulo: Array<any>;
  postulantes: Array<Postulante>;
  postulanteSeleccionado: Postulante;
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;

  constructor(private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) {}

  ngOnInit() {
    this.postulantes = [];
    this.talentoHumano();
    this.postulanteSeleccionado = new Postulante();
    this.postulanteSeleccionado.nombreCompleto = '';
    this.filtro = catalogos.titulos;
  }

  talentoHumano() {
    this.firebaseBDDService.firebaseControllerPostulantes.leer()
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
    });
    console.log(this.postulantes);
  }

  mostrarHojaVida(postulanteSeleccionado: Postulante) {
    this.postulanteSeleccionado = postulanteSeleccionado;
  }

  mostrarTitulos() {
    this.filtro.forEach(element => {
      if (this.tipoTituloSeleccionado === '') {
        this.tipo_titulo = null;
        return;
      }
      if (element.campo_amplio === this.tipoTituloSeleccionado) {
        this.tipo_titulo = element.campos_especificos;
      }
    });
  }

  filtrarPorTitulo() {
    this.postulantes = [];
    this.firebaseBDDService.firebaseControllerPostulantes.filtroExacto('estudiosRealizados/0/titulo', this.tituloSeleccionado)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
    });
  }

  filtroDirecto() {
    this.postulantes = [];
    this.firebaseBDDService.firebaseControllerPostulantes.querySimple('estudiosRealizados/0/titulo', this.criterioBusqueda)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
    });
  }

  imprimir() {
    html2canvas(this.encabezadoHojaVida.nativeElement).then(canvasEncabezado => {
        const encabezadoHojaDatosImg = canvasEncabezado.toDataURL('image/png');
        html2canvas(this.cuerpoHojaVida.nativeElement).then(canvasCuerpo => {
            const cuerpoHojaDatosImg = canvasCuerpo.toDataURL('image/png');
            html2canvas(this.pieHojaVida.nativeElement).then(canvasPie => {
                const pieHojaDatosImg = canvasPie.toDataURL('image/png');
                const doc = new jsPDF();
                doc.addImage(encabezadoHojaDatosImg, 'PNG', 10, 10, 190, 7);
                doc.addImage(cuerpoHojaDatosImg, 'PNG', 30, 17, 160, 265);
                doc.addImage(pieHojaDatosImg, 'PNG', 10, 288, 190, 7);
                doc.save('CV_' + this.postulanteSeleccionado.identificacion + '.pdf');
            });
        });
    });
  }
}
