import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Empresa} from '../models/empresa';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  empresa: Empresa;

  constructor(private authService: AuthService, public _http: HttpClient) {
    this.empresa = this.authService.usuarioNegocio as Empresa;
  }

  getAllOffers(actual_page: number, records_per_page: number) {
    const url = 'http://localhost:8089/offers?limit=' + records_per_page + '&page=' + actual_page + '&field=id&order=ASC';
    console.log(url);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Api-Token', 'oJhjGsMcXUgIQoggInJOkQ2wFkkzjD45oWHWtx9SuKdbNh0mCzMATWQn8txh');
    const body = {'id': 1};
    const options = {headers: headers};
    return this._http.get(url, options);
  }


}
