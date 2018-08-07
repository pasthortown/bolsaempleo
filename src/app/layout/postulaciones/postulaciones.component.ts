import {PostulacionDiccionario} from './../../models/miPostulacionDiccionario';
import {Empresa} from '../../models/empresa';
import {AuthService} from '../../services/auth.service';
import {FirebaseBDDService} from '../../services/firebase-bdd.service';
import {Postulacion} from '../../models/postulacion';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnInit} from '@angular/core';
import {Postulante} from '../../models/postulante';
import {PostulanteService} from '../../services/postulante.service';
import {Oferta} from '../../models/oferta';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  misPostulacionesFB: Array<Postulacion> = [];
  misPostulaciones: Array<PostulacionDiccionario> = [];
  oferta: Oferta;

  constructor(private authService: AuthService, private postulanteService: PostulanteService, private modalService: NgbModal, private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.postulanteService.postulante = this.authService.usuarioNegocio as Postulante;
    this.oferta = new Oferta();
    this.getMisPostulaciones();
  }

  open(content) {
    this.modalService.open(content)
      .result
      .then((resultModal => {

      }), (resultCancel => {

      }));
  }

  getMisPostulaciones() {
    this.firebaseBDDService.firebaseControllerPostulaciones.filtroExacto('idPostulante', this.postulanteService.postulante.id).snapshotChanges().subscribe(items => {
      items.forEach(element => {
        let itemLeido: Postulacion;
        itemLeido = element.payload.val() as Postulacion;
        itemLeido.id = element.key;
        this.misPostulacionesFB.push(itemLeido);
        const postulacionDiccionario = new PostulacionDiccionario();
        postulacionDiccionario.fecha = itemLeido.fecha;
        postulacionDiccionario.id = itemLeido.id;
        this.firebaseBDDService.firebaseControllerOfertas.filtroExacto('id', itemLeido.idOferta).snapshotChanges().subscribe(itemsOfertas => {
          itemsOfertas.forEach(elementOferta => {
            let itemLeidoOferta: Oferta;
            itemLeidoOferta = elementOferta.payload.val() as Oferta;
            itemLeidoOferta.id = elementOferta.key;
            postulacionDiccionario.oferta = itemLeidoOferta;
            this.firebaseBDDService.firebaseControllerEmpresas.filtroExacto('id', itemLeidoOferta.idEmpresa).snapshotChanges().subscribe(itemsEmpresas => {
              itemsEmpresas.forEach(elementEmpresa => {
                let itemLeidoEmpresa: Empresa;
                itemLeidoEmpresa = elementEmpresa.payload.val() as Empresa;
                itemLeidoEmpresa.id = elementEmpresa.key;
                postulacionDiccionario.empresa = itemLeidoEmpresa;
              });
            });
          });
          this.misPostulaciones.push(postulacionDiccionario);
        });
      });
    });
  }

  openOfertaLaboral(content, oferta: Oferta, editar) {
    const logoutScreenOptions: NgbModalOptions = {
      size: 'lg'
    };
    if (editar) {
      this.oferta = oferta;
    } else {
      this.oferta = new Oferta();
    }
    this.modalService.open(content, logoutScreenOptions)
      .result
      .then((resultAceptar => {
        // const errores = this.validarCamposObligatorios(item);
        if (true) {
          if (resultAceptar === 'save') {
            if (editar) {
              //        this.actualizar();
            } else {
              //      this.insertar();
              //    this.agregarOferta();
            }
          }
        } else {
          /*swal({
            position: 'center',
            type: 'error',
            title: 'Los siguientes campos son requeridos:!',
            text: errores,
            showConfirmButton: true,
            timer: 15000
          });*/
        }
      }), (resultCancel => {

      }));
  }
}
