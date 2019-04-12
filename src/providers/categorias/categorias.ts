import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the CategoriasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriasProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CategoriasProvider Provider');
  }

  apiUrl = 'http://www.api.avantisoluciones.com/public';

  public getCategorias() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/categorias').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // public getEstablecimientoCategoria(id) {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/establecimientoidcategoria/'+id).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }
  public getSucursales(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/sucursalcategoria/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  public getProducto(id) {
    // id sucursal
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/sucursalproductos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  public getProductoDellate(id) {
    // id sucursal
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/detalleproducto/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public getEstablecimiento() {
    // id sucursal
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/establecimiento').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public ActualizarFavoritos(id_empleado,id_sucursal,estado){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/favoritos/'+id_empleado+'/'+id_sucursal+'/'+estado).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public indexfavoritos(id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/indexfavoritos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
