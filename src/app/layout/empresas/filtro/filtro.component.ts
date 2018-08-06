import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../../services/oferta.service';
import {EmpresaService} from '../../../services/empresa.service';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {Oferta} from '../../../models/oferta';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {catalogos} from '../../../../environments/catalogos';
import {Postulacion} from '../../../models/postulacion';
import {AuthService} from '../../../services/auth.service';
import {Postulante} from '../../../models/postulante';
import {Router} from '@angular/router';
import {PostulacionDiccionario} from '../../../models/miPostulacionDiccionario';
import {Empresa} from '../../../models/empresa';
import {PostulanteService} from '../../../services/postulante.service';

@Component({
  selector: 'app-filtro-ofertas',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  oferta: Oferta;
  misPostulacionesFB: Array<Postulacion> = [];
  misPostulaciones: Array<PostulacionDiccionario> = [];
  postulacion: Postulacion;
  postulante: Postulante;
  ofertas: Array<Oferta>;
  ofertasAux: Array<Oferta>;
  areas: Array<any>;
  etiquetaPrincipal: string;
  etiquetaSecundaria: string;
  campoAmplioSeleccionado: string;
  campoEspecificoSeleccionado: string;
  flag: string;
  criterioBusqueda: string;
  pagina = 0;
  registrosPorPagina = 10;
  totalPaginas = 1;
  campo = 'estudiosRealizados/0/tipo_titulo';

  constructor(private modalService: NgbModal,
              public empresaService: EmpresaService,
              private postulanteService: PostulanteService,
              private firebaseBDDService: FirebaseBDDService,
              public authService: AuthService,
              private router: Router,
              public ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.criterioBusqueda = '';
    this.postulante = this.authService.obtenerUsuario();
    this.postulacion = new Postulacion();
    this.oferta = new Oferta();
    this.areas = catalogos.titulos;
    this.ofertas = new Array<Oferta>();
    this.paginacion(true);
    this.getTotalPaginas();
    this.validarOfertasConPostulaciones();
    if (this.postulante != null) {
      this.validarOfertasConPostulaciones();
    }
    // this.leerOfertas();
    // this.contarOfertasPorCampoEspecifico();
  }

  getTotalPaginas() {
    const ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getAll().snapshotChanges().subscribe(items => {
      this.totalPaginas = Math.ceil(items.length / this.registrosPorPagina);
      items.forEach(element => {
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        ofertas.push(itemLeido);
      });
      this.contarOfertasPorCampoAmplio(ofertas);
      this.contarOfertasPorCampoEspecifico(ofertas);
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
    this.ofertas = [];
    this.firebaseBDDService.firebaseControllerOfertas.getPagina(this.pagina, this.registrosPorPagina, this.campo).snapshotChanges().subscribe(items => {
      let i = (this.pagina - 1) * this.registrosPorPagina;
      while (i < items.length) {
        let itemLeido: Oferta;
        itemLeido = items[i].payload.val() as Oferta;
        this.ofertas.push(itemLeido);
        i++;
      }
    });
  }

  leerOfertas() {
    this.firebaseBDDService.firebaseControllerOfertas.getAll()
      .snapshotChanges().subscribe(items => {
      this.ofertas = [];
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
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }

  openOfertaLaboral(content, item: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    console.log(item);
    this.oferta = item;
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        if (resultAceptar === 'aplicar') {
          this.aplicarOferta(item);
        }

      }), (resultCancel => {

      }));
  }

  aplicarOferta(oferta) {
    this.postulacion.idPostulante = this.postulante.id;
    this.postulacion.idOferta = oferta.id;

    swal({
      title: '¿Está seguro de Aplicar?',
      text: oferta.cargo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        this.firebaseBDDService.firebaseControllerPostulaciones.insertar(this.postulacion);
        swal({
          title: 'Oferta Aplicada',
          text: 'Aplicación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  borrarFiltro() {
    this.etiquetaPrincipal = '';
    this.leerOfertas();
  }

  filtrarPorCargo() {
    this.ofertas = [];
    this.etiquetaPrincipal = this.criterioBusqueda;
    this.firebaseBDDService.firebaseControllerOfertas.querySimple('cargo', this.criterioBusqueda.toUpperCase())
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
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }

  filtrarPorCampoAmplio(filtro) {
    this.ofertas = [];
    this.etiquetaPrincipal = filtro;
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoAmplio', filtro)
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
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }

  filtrarPorCampoEspecifico(filtro) {
    this.ofertas = [];
    this.etiquetaPrincipal = filtro;
    this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoEspecifico', filtro)
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
        let itemLeido: Oferta;
        itemLeido = element.payload.val() as Oferta;
        this.ofertas.push(itemLeido);
      });
    });
  }

  contarOfertasPorCampoAmplio(ofertas: Array<Oferta>) {
    this.areas.forEach(area => {
      area.total = 0;
    });
    ofertas.forEach(oferta => {
      this.areas.forEach(area => {
        if (oferta.campoAmplio === area.campo_amplio) {
          area.total = area.total + 1;
        }
      });
    });
    /*
    this.ofertas = [];
    this.areas.forEach(value => {
      value.total = 0;
      this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoAmplio', value.campo_amplio)
        .snapshotChanges().subscribe(items => {
        items.forEach(element => {
          let itemLeido: Oferta;
          itemLeido = element.payload.val() as Oferta;
          if (value.campo_amplio === itemLeido.campoAmplio) {
            value.total = items.length;
          }
        });
      });
    });
    */
  }

  contarOfertasPorCampoEspecifico(ofertas: Array<Oferta>) {
    this.areas.forEach(area => {
      area.campos_especificos.forEach(areaEspecifica => {
        areaEspecifica.total = 0;
      });
    });
    ofertas.forEach(oferta => {
      this.areas.forEach(area => {
        area.campos_especificos.forEach(areaEspecifica => {
          if (oferta.campoEspecifico === areaEspecifica.nombre) {
            areaEspecifica.total = areaEspecifica.total + 1;
          }
        });
      });
    });

    /*
    this.ofertas = [];
    this.areas.forEach(value => {
      value.campos_especificos.forEach(campoEspecifico => {
        this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('campoEspecifico', campoEspecifico.nombre)
          .snapshotChanges().subscribe(items => {
          campoEspecifico.total = 0;
          items.forEach(element => {
            let itemLeido: Oferta;
            itemLeido = element.payload.val() as Oferta;
            if (campoEspecifico.nombre === itemLeido.campoEspecifico) {
              campoEspecifico.total = items.length;
            }
          });
        });
      });
    });
    */
  }

  validarSesion() {
    swal({
      title: 'Para ver más Información tiene que iniciar sesión como Postulante',
      text: '',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-sign-in" aria-hidden="true"> Iniciar Sesión</i>'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['login']);
      }
    });
  }

  getMisPostulaciones(): Array<Postulacion> {
    this.firebaseBDDService.firebaseControllerPostulaciones.getId('idPostulante', this.postulante.id)
      .snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulacion;
        itemLeido = element.payload.val() as Postulacion;
        itemLeido.id = element.key;
        // Como puedo usar this.misPostulacionesFB porque cuando la quiero usar en validarOfertasConPostulaciones() me sale que esta vacia
        // lo mismo pasa con las ofertas this.ofertas cuando la quiero usar me dice que esta vacia, entido yo que es porque es asincronica la conexion
        this.misPostulacionesFB.push(itemLeido);
      });
      return this.misPostulacionesFB;
    });
    return null;
  }

  validarOfertasConPostulaciones() {
    this.leerOfertas();
  }

  leerOfertasAux() {
    this.firebaseBDDService.firebaseControllerOfertas.getAll()
      .snapshotChanges()
      .forEach(items => {
        console.log(items);
      });
  }
}
