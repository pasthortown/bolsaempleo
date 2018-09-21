import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Company} from '../models/company';
import {User} from 'firebase';
import {stringify} from 'querystring';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public _http: HttpClient) {
  }

  createCompanyUser(data: any): Observable<any> {
    console.log(data);
    const url = environment.apiUrl + 'users/createCompanyUser';
    console.log(url);
    return this._http.post(url, JSON.stringify(data));
  }

  createProfessionalUser(data: any): Observable<any> {
    console.log(data);
    const url = environment.apiUrl + 'users/createProfessionalUser';
    console.log(url);
    return this._http.post(url, JSON.stringify(data));
  }

  login(data: any): Observable<any> {
    console.log(data);
    const url = environment.apiUrl + 'login';
    console.log(url);
    return this._http.post(url, JSON.stringify(data));
  }
}
