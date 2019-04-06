import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PerfilProvider Provider');
  }

  apiUrl = 'http://www.api.avantisoluciones.com/public';

  public getUser(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
