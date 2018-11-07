import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs';

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

  getTotalOffers() {
    const url = environment.apiUrl + 'totalOffers';
    return this._http.get(url);
  }

  getOffers(actual_page: number, records_per_page: number) {
    const url = environment.apiUrl + 'oportunities?limit=' + records_per_page + '&page=' + actual_page + '&field=start_date&order=DESC';
    return this._http.get(url);
  }

  validateAppliedOffer(userId: number, offerId: number) {
    const url = environment.apiUrl + 'oportunities/validateAppliedOffer?user_id=' + userId + '&offer_id=' + offerId;
    return this._http.get(url);
  }

  filterOffers(data: any, actual_page: number, records_per_page: number) {
    const url = environment.apiUrl + 'offers/filter?limit=' + records_per_page + '&page=' + actual_page + '&field=start_date&order=DESC';
    console.log(JSON.stringify(data));
    return this._http.post(url, JSON.stringify(data));
  }

  filterOffersField(filter: string, actual_page: number, records_per_page: number) {
    const url = environment.apiUrl + 'oportunities/filter?limit=' + records_per_page + '&page=' + actual_page + '&field=start_date&order=DESC&filter=' + filter;
    return this._http.get(url);
  }

  applyOffer(data: any, api_token: string) {
    const url = environment.apiUrl + 'oportunities/apply';
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.post(url, JSON.stringify(data), {headers: this.headers});
  }

}
