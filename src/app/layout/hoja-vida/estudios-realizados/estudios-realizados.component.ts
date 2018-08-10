import {catalogos} from './../../../../environments/catalogos';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PostulanteService} from './../../../services/postulante.service';
import {Component, OnInit} from '@angular/core';
import {EstudioRealizado} from '../../../models/estudio-realizado';
import swal from 'sweetalert2';
import {FirebaseBDDService} from '../../../services/firebase-bdd.service';

@Component({
  selector: 'app-estudios-realizados',
  templateUrl: './estudios-realizados.component.html',
  styleUrls: ['./estudios-realizados.component.css']
})
export class EstudiosRealizadosComponent implements OnInit {
  estudioRealizado: EstudioRealizado;
  filtro: Array<any>;
  tipo_titulo: Array<any>;
  instituciones: Array<any>;

  constructor(private modalService: NgbModal, public postulanteService: PostulanteService,
              private firebaseBDDService: FirebaseBDDService) {
  }

  ngOnInit() {
    this.estudioRealizado = new EstudioRealizado();
    this.filtro = catalogos.titulos;
    this.instituciones = catalogos.instituciones;
    this.ordenarPorAntiguedad(true);
  }

  open(content, item: EstudioRealizado, editar) {
    if (editar) {
      this.estudioRealizado = item;
      this.mostrar();
    } else {
      this.estudioRealizado = new EstudioRealizado();
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (!editar) {
            this.agregar();
            this.actualizar();
          } else {
            this.actualizar();
          }
        }
      }), (resultCancel => {

      }));
  }

  ordenarPorAntiguedad(descendente: boolean) {
    if (this.postulanteService.postulante.estudiosRealizados.length > 0) {
      this.postulanteService.postulante.estudiosRealizados.sort((n1, n2) => {
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

  agregar() {
    if (this.postulanteService.postulante.estudiosRealizados == null) {
      this.postulanteService.postulante.estudiosRealizados = [];
    }
    this.postulanteService.postulante.estudiosRealizados.push(this.estudioRealizado);
    this.estudioRealizado = new EstudioRealizado();
    this.ordenarPorAntiguedad(true);
  }

  borrar(item: EstudioRealizado) {
    swal({
      title: '¿Está seguro de Eliminar?',
      text: item.titulo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="fa fa-trash" aria-hidden="true"></i>'
    }).then((result) => {
      if (result.value) {
        const estudios = [];
        this.postulanteService.postulante.estudiosRealizados.forEach(element => {
          if (element !== item) {
            estudios.push(element);
          }
        });
        this.postulanteService.postulante.estudiosRealizados = estudios;
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

  mostrar() {
    this.filtro.forEach(element => {
      if (this.estudioRealizado.tipo_titulo === '') {
        this.tipo_titulo = null;
        return;
      }
      if (element.campo_amplio === this.estudioRealizado.tipo_titulo) {
        this.tipo_titulo = element.campos_especificos;
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
