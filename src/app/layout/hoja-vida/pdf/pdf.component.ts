import { PostulanteService } from './../../../services/postulante.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent implements OnInit {
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;

  constructor(public postulanteService: PostulanteService) { }

  ngOnInit() {
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
                doc.save('CV_' + this.postulanteService.postulante.identificacion + '.pdf');
            });
        });
    });
  }
}
