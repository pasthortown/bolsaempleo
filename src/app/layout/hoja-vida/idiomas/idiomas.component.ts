import {Idioma} from './../../../models/idioma';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import {catalogos} from '../../../../environments/catalogos';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';
import {ReferenciaPersonal} from '../../../models/referenciaPersonal';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {
  idioma: Idioma;
  idiomas: Array<any>;

  constructor(
    private modalService: NgbModal,
    public postulanteService: PostulanteService,
    private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.idioma = new Idioma();
    this.idiomas = catalogos.idiomas;
  }

  open(content, item: Idioma, editar) {
    if (editar) {
      this.idioma = item;
    } else {
      this.idioma = new Idioma();
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (!editar) {
            this.agregar();
            this.actualizar();
          }
        }
      }), (resultCancel => {

      }));
  }

  agregar() {
    if (this.postulanteService.postulante.idiomas == null) {
      this.postulanteService.postulante.idiomas = [];
    }
    this.postulanteService.postulante.idiomas.push(this.idioma);
    this.idioma = new Idioma();
  }

  borrar(item: Idioma) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.idioma,
      type: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const idiomas = [];
        this.postulanteService.postulante.idiomas.forEach(element => {
          if (element !== item) {
            idiomas.push(element);
          }
        });
        this.postulanteService.postulante.idiomas = idiomas;
        this.actualizar();
        swal({
          title: 'Oferta',
          text: 'Eliminación exitosa!',
          type: 'success',
          timer: 2000
        });
      }
    });
  }

  actualizar() {
    this.firebaseBDDService.firebaseControllerPostulantes.actualizar(this.postulanteService.postulante);
    swal({
      position: 'center',
      type: 'success',
      title: 'Estudio Realizado',
      text: 'Registro exitoso!',
      showConfirmButton: true,
      timer: 2000
    });
  }

}
