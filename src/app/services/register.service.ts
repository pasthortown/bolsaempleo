import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  headers: HttpHeaders;

  constructor(public _http: HttpClient) {
  }

  createCompanyUser(data: any): Observable<any> {
    const url = environment.apiUrl + 'users/createCompanyUser';
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

  logout(data: any): Observable<any> {
    const url = environment.apiUrl + 'logout';
    console.log('api_token');
    this.headers = new HttpHeaders().set('Api-Token', data['user']['api_token']);
    return this._http.post(url, JSON.stringify(data), {headers: this.headers});
  }
}
