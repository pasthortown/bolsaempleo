import {Injectable} from '@angular/core';
import {Oferta} from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  ofertas: Array<Oferta>;

  constructor() {
    this.ofertas = new Array<Oferta>();
  }
}
