import {Postulante} from './../models/postulante';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostulanteService {
  postulante: Postulante;
  headers: HttpHeaders;

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

  getAcademicFormations(actual_page: number, records_per_page: number, id: number, api_token: string) {
    const url = environment.apiUrl + 'academicFormations?limit=' + records_per_page + '&page=' + actual_page
      + '&field=id&order=ASC&user_id=' + id;
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.get(url, {headers: this.headers});
  }

  createAcademicFormation(data: any, api_token: string) {
    const url = environment.apiUrl + 'academicFormations';
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.post(url, JSON.stringify(data), {headers: this.headers});
  }

  updateAcademicFormation(data: any, api_token: string) {
    const url = environment.apiUrl + 'academicFormations';
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.put(url, JSON.stringify(data), {headers: this.headers});
  }

  deleteAcademicFormation(id: number, api_token: string) {
    const url = environment.apiUrl + 'academicFormations?id=' + id;
    this.headers.set('Api-Token', api_token);
    return this._http.delete(url, {headers: this.headers});
  }

  getProfessional(id, api_token) {
    const url = environment.apiUrl + 'professionals/' + id;
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.get(url, {headers: this.headers});
  }

  updateProfessional(data: any, api_token: string) {
    const url = environment.apiUrl + 'professionals';
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.put(url, JSON.stringify(data), {headers: this.headers});
  }

  deleteProfessional(id: number, api_token: string) {
    const url = environment.apiUrl + 'offers?id=' + id;
    this.headers.set('Api-Token', api_token);
    return this._http.delete(url, {headers: this.headers});
  }
}
