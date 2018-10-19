import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  headers: HttpHeaders;

  constructor(public _http: HttpClient) {

  }

  getAllOffers() {
    const url = environment.apiUrl + 'offers';
    return this._http.get(url);
  }

  getOffers(actual_page: number, records_per_page: number) {
    const url = environment.apiUrl + 'oportunities?limit=' + records_per_page + '&page=' + actual_page + '&field=id&order=ASC';
    return this._http.get(url);
  }

  filterOffers(data: any, actual_page: number, records_per_page: number) {
    const url = environment.apiUrl + 'offers/filter?limit=' + records_per_page + '&page=' + actual_page + '&field=id&order=ASC';
    return this._http.post(url, JSON.stringify(data));
  }

}
