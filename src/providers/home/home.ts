
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HomeProvider Provider');
  }

  apiUrl = 'http://www.api.avantisoluciones.com/public';

  public getCategorias() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/promociones').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public getDetallePromocion(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/promocion/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public getProductoAComprar(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/productoacomprar/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public getTerminoscondiciones(id) {
    // id establecimiento
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/terminoscondiciones/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  public getMonto(id) {
    // id establecimiento
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/consultarmonto/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public inactivo(id) {
    // id establecimiento
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/inactivo/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  public peticionesempleado(id) {
    // id establecimiento
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/peticionesempleado/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  img_tarjeta(id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/img_tarjeta/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

}
