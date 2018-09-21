import {AuthService} from './auth.service';
import {Postulante} from './../models/postulante';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  postulante: Postulante;

//  headers = new HttpHeaders();

  constructor(
     public _http: HttpClient
  ) {
  }
  getAllOffers() {
    const url = 'http://localhost:8089/offers?limit=10&page=1&field=id&order=ASC';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Api-Token', 'oJhjGsMcXUgIQoggInJOkQ2wFkkzjD45oWHWtx9SuKdbNh0mCzMATWQn8txh');
    const body = {'id': 1};
    const options = {headers: headers};
    return this._http.get(url, options);
  }

}
