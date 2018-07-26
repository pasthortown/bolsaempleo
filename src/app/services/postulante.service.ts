import { AuthService } from './auth.service';
import { Postulante } from './../models/postulante';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  postulante: Postulante;

  constructor() {

  }
}
