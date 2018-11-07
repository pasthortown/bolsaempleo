import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: HttpHeaders;

  constructor(public _http: HttpClient) {
  }

  updatePassword(data: any, api_token: string) {
    const url = environment.apiUrl + 'users/password';
    console.log(data);
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.put(url, JSON.stringify(data), {headers: this.headers});
  }

  recoverPassword(data: any, api_token: string) {
    const url = environment.apiUrl + 'users/password';
    console.log(data);
    this.headers = new HttpHeaders().set('Api-Token', api_token);
    return this._http.put(url, JSON.stringify(data), {headers: this.headers});
  }
}
