import {AuthService} from './../../../services/auth.service';
import {catalogos} from './../../../../environments/catalogos';
import {FirebaseBDDService} from './../../../services/firebase-bdd.service';
import {Postulante} from './../../../models/postulante';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Oferta} from '../../../models/oferta';
import swal from 'sweetalert2';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  filtro: Array<any>;
  criterioBusqueda = '';
  etiquetaPrincipal: string;
  tipo_titulo: Array<any>;
  postulantes: Array<Postulante>;
  postulanteSeleccionado: Postulante;
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;

  constructor(public authService: AuthService, private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.postulantes = [];
    this.filtroDirecto();
    this.postulanteSeleccionado = new Postulante();
    this.postulanteSeleccionado.nombreCompleto = '';
    this.filtro = catalogos.titulos;
  }

  mostrarHojaVida(postulanteSeleccionado: Postulante) {
    this.postulanteSeleccionado = postulanteSeleccionado;
  }

  filtrarPorTitulo(areaEspecifica: string) {
    this.postulantes = [];
    this.etiquetaPrincipal = areaEspecifica;
    this.firebaseBDDService.firebaseControllerPostulantes.filtroExacto('estudiosRealizados/0/titulo', areaEspecifica)
      .snapshotChanges().subscribe(items => {
      if (items.length === 0) {
        swal({
          position: 'center',
          type: 'info',
          title: 'No contamos con el Talento Humano Requerido',
          text: '',
          showConfirmButton: false,
          timer: 3000
        });
      }
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
    });
  }

  borrarFiltro() {
    this.etiquetaPrincipal = '';
    this.filtroDirecto();
  }
  filtroDirecto() {
    this.postulantes = [];
    this.firebaseBDDService.firebaseControllerPostulantes.querySimple('estudiosRealizados/0/titulo', this.criterioBusqueda)
      .snapshotChanges().subscribe(items => {
      if (items.length === 0) {
        swal({
          position: 'center',
          type: 'info',
          title: 'No existen Ofertas',
          text: '',
          showConfirmButton: false,
          timer: 2000
        });
      }
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        this.postulantes.push(itemLeido);
      });
      this.contarOfertasPorCampoAmplio(this.postulantes);
      this.contarOfertasPorCampoEspecifico(this.postulantes);
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

  contarOfertasPorCampoAmplio(postulantes: Array<Postulante>) {
    this.filtro.forEach(area => {
      area.total = 0;
    });
    postulantes.forEach(postulante => {
      this.filtro.forEach(area => {
        postulante.estudiosRealizados.forEach(estudiosRealizados => {
          if (estudiosRealizados.tipo_titulo === area.campo_amplio) {
            area.total = area.total + 1;
          }
        });
      });
    });
    /*
    this.filtro.forEach(value => {
      value.total = 0;
      this.firebaseBDDService.firebaseControllerPostulantes.filtroExacto('estudiosRealizados/0/tipo_titulo', value.campo_amplio)
        .snapshotChanges().subscribe(items => {
        items.forEach(element => {
          let itemLeido: Postulante;
          itemLeido = element.payload.val() as Postulante;
          itemLeido.estudiosRealizados.forEach(estudiosRealizados => {
            if (value.campo_amplio === estudiosRealizados.tipo_titulo) {
              value.total = items.length;
            }
          });
        });
      });
    });
    */
  }

  contarOfertasPorCampoEspecifico(postulantes: Array<Postulante>) {
    this.filtro.forEach(area => {
      area.campos_especificos.forEach(areaEspecifica => {
        areaEspecifica.total = 0;
      });
    });
    postulantes.forEach(postulante => {
      this.filtro.forEach(area => {
        postulante.estudiosRealizados.forEach(estudiosRealizados => {
          area.campos_especificos.forEach(areaEspecifica => {
            if (estudiosRealizados.titulo === areaEspecifica.nombre) {
              areaEspecifica.total = areaEspecifica.total + 1;
            }
          });
        });
      });
    });
    /*
    this.filtro.forEach(value => {
      value.total = 0;
      value.campos_especificos.forEach(campoEspecifico => {
        campoEspecifico.total = 0;
        this.firebaseBDDService.firebaseControllerPostulantes.filtroExacto('estudiosRealizados/0/titulo', campoEspecifico.nombre)
          .snapshotChanges().subscribe(items => {
          items.forEach(element => {
            let itemLeido: Postulante;
            itemLeido = element.payload.val() as Postulante;
            itemLeido.estudiosRealizados.forEach(estudioRealizado => {
              if (campoEspecifico.nombre === estudioRealizado.titulo) {
                campoEspecifico.total = items.length;
              }
            });
          });
        });
      });
    });
    */
  }
}
