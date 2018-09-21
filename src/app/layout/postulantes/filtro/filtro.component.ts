import {AuthService} from './../../../services/auth.service';
import {catalogos} from './../../../../environments/catalogos';
import {FirebaseBDDService} from './../../../services/firebase-bdd.service';
import {Postulante} from './../../../models/postulante';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {EmpresaService} from '../../../services/empresa.service';
import {Empresa} from '../../../models/empresa';
import {Contactado} from '../../../models/contactado';
import {PostulanteService} from '../../../services/postulante.service';

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
  campo = 'estudiosRealizados/0/tipo_titulo';
  pagina = 0;
  registrosPorPagina = 21;
  totalPaginas = 1;
  contactado: Contactado;
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;

  constructor(private dataService: PostulanteService,
              public authService: AuthService,
              private empresaService: EmpresaService,
              private modalService: NgbModal,
              private firebaseBDDService: FirebaseBDDService,
              private router: Router) {
  }

  ngOnInit() {
//    this.getAllOffers();
    this.empresaService.empresa = this.authService.obtenerUsuario() as Empresa;
    this.contactado = new Contactado();
    this.postulantes = [];
    this.paginacion(true);
    this.getTotalPaginas();
    this.postulanteSeleccionado = new Postulante();
    this.postulanteSeleccionado.nombreCompleto = '';
    this.filtro = catalogos.titulos;

  }

  getTotalPaginas() {
    const postulantes = [];
    this.firebaseBDDService.firebaseControllerPostulantes.getAll().snapshotChanges().subscribe(items => {
      this.totalPaginas = Math.ceil(items.length / this.registrosPorPagina);
      items.forEach(element => {
        let itemLeido: Postulante;
        itemLeido = element.payload.val() as Postulante;
        postulantes.push(itemLeido);
      });
      this.contarOfertasPorCampoAmplio(postulantes);
      this.contarOfertasPorCampoEspecifico(postulantes);
    });
  }

  paginacion(siguiente: boolean) {
    if (siguiente) {
      if (this.pagina === this.totalPaginas) {
        return;
      } else {
        this.pagina++;
      }
    } else {
      if (this.pagina === 1) {
        return;
      } else {
        this.pagina--;
      }
    }
    this.firebaseBDDService.firebaseControllerPostulantes.getPagina(this.pagina, this.registrosPorPagina, this.campo)
      .snapshotChanges().subscribe(items => {
      this.postulantes = [];
      let i = (this.pagina - 1) * this.registrosPorPagina;
      while (i < items.length) {
        let itemLeido: Postulante;
        itemLeido = items[i].payload.val() as Postulante;
        if (itemLeido.estudiosRealizados != null) {
          this.postulantes.push(itemLeido);
        }
        i++;
      }
    });
  }

  mostrarHojaVida(postulanteSeleccionado: Postulante) {
    this.postulanteSeleccionado = postulanteSeleccionado;
  }

  aplicarContactado(postulante: Postulante) {
    this.contactado.idPostulante = this.postulanteSeleccionado.id;
    this.contactado.idEmpresa = this.empresaService.empresa.id;
    console.log(this.contactado.idEmpresa);
    swal({
      title: '¿Está seguro de Contactar?',
      text: postulante.nombreCompleto.toUpperCase(),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.firebaseBDDService.firebaseControllerContactados.insertar(this.contactado);
        swal({
          title: 'Profesional Contactado',
          text: 'Registro existoso!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  openPostulante(content, item: Postulante, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    this.postulanteSeleccionado = item;
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (resultAceptar === 'aplicar') {
          this.aplicarContactado(item);
        }
      }), (resultCancel => {

      }));
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
          title: 'No contamos con los profesionales requeridos!',
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

  validarSesion() {
    swal({
      title: 'Para ver más Información tiene que iniciar sesión como Empresa',
      text: '',
      type: 'info',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-sign-in" aria-hidden="true"> Iniciar Sesión</i>',
      cancelButtonText: '<i class="fa fa-address-book" aria-hidden="true"> Regístrate</i>'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login']);
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.router.navigate(['empresa']);
      }
    });
  }

  borrarFiltro() {
    this.etiquetaPrincipal = '';
    this.filtroDirecto();
  }

  filtroDirecto() {
    this.postulantes = [];
    this.firebaseBDDService.firebaseControllerPostulantes
      .querySimple('estudiosRealizados/0/titulo', this.criterioBusqueda.toUpperCase())
      .snapshotChanges().subscribe(items => {
      if (items.length === 0) {
        swal({
          position: 'center',
          type: 'info',
          title: 'No existen Profesionales con ese título',
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
          doc.save('CV_' + this.postulanteSeleccionado.identificacion + '.pdf');
        });
      });
    });
  }

  imprimir() {
    return xepOnline.Formatter.Format('curriculum', {
      render: 'download',
      filename: 'CV - ' + this.postulanteSeleccionado.nombreCompleto.toLocaleUpperCase() + ' (' + this.postulanteSeleccionado.identificacion + ')'
    });
  }

  contarOfertasPorCampoAmplio(postulantes: Array<Postulante>) {
    this.filtro.forEach(area => {
      area.total = 0;
    });
    postulantes.forEach(postulante => {
      this.filtro.forEach(area => {
        if (postulante.estudiosRealizados != null) {
          postulante.estudiosRealizados.forEach(estudiosRealizados => {
            if (estudiosRealizados.tipo_titulo === area.campo_amplio) {
              area.total = area.total + 1;
            }
          });
        }
      });
    });
  }

  contarOfertasPorCampoEspecifico(postulantes: Array<Postulante>) {
    this.filtro.forEach(area => {
      area.campos_especificos.forEach(areaEspecifica => {
        areaEspecifica.total = 0;
      });
    });
    postulantes.forEach(postulante => {
      this.filtro.forEach(area => {
        if (postulante.estudiosRealizados != null) {
          postulante.estudiosRealizados.forEach(estudiosRealizados => {
            area.campos_especificos.forEach(areaEspecifica => {
              if (estudiosRealizados.titulo === areaEspecifica.nombre) {
                areaEspecifica.total = areaEspecifica.total + 1;
              }
            });
          });
        }
      });
    });
  }



}
