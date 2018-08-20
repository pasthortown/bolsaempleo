import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PostulanteService} from '../../services/postulante.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Postulante} from '../../models/postulante';
import {AuthService} from '../../services/auth.service';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  curriculum: Postulante;
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;


  constructor(
    public postulanteService: PostulanteService,
    public authService: AuthService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.curriculum = new Postulante();
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    let month = fechaActual.getMonth();
    month += 1;
    const day = fechaActual.getDate();

    this.curriculum.fechaDeNacimiento = {
      year: year,
      month: month,
      day: day
    };
    this.leerCurriculum();
  }

  leerCurriculum() {
    this.firebaseBDDService.firebaseControllerPostulantes.getId('id', this.getId())
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        itemLeido.id = element.key;
        this.curriculum = itemLeido;
        this.ordenarPorAntiguedadCapacitaciones(true);
        this.ordenarPorAntiguedadEstudiosRealizados(true);
        this.ordenarPorAntiguedadExperienciasLaborales(true);
      });
    });
  }

  imprimir2() {
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
          doc.save('CV_' + this.curriculum.identificacion + '.pdf');
        });
      });
    });
  }

  imprimir() {
    return xepOnline.Formatter.Format('curriculum', {
      render: 'download',
      filename: 'CV - ' + this.curriculum.nombreCompleto.toLocaleUpperCase() + ' (' + this.curriculum.identificacion + ')'
    });
  }

  getQueryParams(name) {
    const url = location.href;
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    const regexS = '[\\?&]' + name + '=([^&#]*)';
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? null : results[1];
  }

  getId(): string {
    return this.getQueryParams('idPostulante');
  }

  ordenarPorAntiguedadExperienciasLaborales(descendente: boolean) {
    this.curriculum.experienciasLaborales.sort((n1, n2) => {
      const fechaInicio = new Date(n1.fechaInicio.year + '/' + n1.fechaInicio.month + '/' + n1.fechaInicio.day);
      const fechaFin = new Date(n2.fechaInicio.year + '/' + n2.fechaInicio.month + '/' + n2.fechaInicio.day);
      if (fechaFin > fechaInicio) {
        if (descendente) {
          return 1;
        } else {
          return -1;
        }
      }
      if (fechaFin < fechaInicio) {
        if (descendente) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }

  ordenarPorAntiguedadCapacitaciones(descendente: boolean) {
    this.curriculum.capacitaciones.sort((n1, n2) => {
      const fechaInicio = new Date(n1.fechaInicio.year + '/' + n1.fechaInicio.month + '/' + n1.fechaInicio.day);
      const fechaFin = new Date(n2.fechaInicio.year + '/' + n2.fechaInicio.month + '/' + n2.fechaInicio.day);
      if (fechaFin > fechaInicio) {
        if (descendente) {
          return 1;
        } else {
          return -1;
        }
      }
      if (fechaFin < fechaInicio) {
        if (descendente) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }

  ordenarPorAntiguedadEstudiosRealizados(descendente: boolean) {
    this.curriculum.estudiosRealizados.sort((n1, n2) => {
      const fechaInicio = new Date(n1.fechaRegistro.year + '/' + n1.fechaRegistro.month + '/' + n1.fechaRegistro.day);
      const fechaFin = new Date(n2.fechaRegistro.year + '/' + n2.fechaRegistro.month + '/' + n2.fechaRegistro.day);
      if (fechaFin > fechaInicio) {
        if (descendente) {
          return 1;
        } else {
          return -1;
        }
      }
      if (fechaFin < fechaInicio) {
        if (descendente) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }
}
