import { IonicPage,NavController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
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
  public ActUser(request){
    return new Promise((resolve, reject)=>{
      let headeres = new HttpHeaders();
      headeres = headeres.set('Content-Type', 'application/json; charset=utf-8');
      
        var url = this.apiUrl;
        // credentials.email.replace("","="); 
        // credentials.password.replace(/['"]+/g, '2'); 

        console.log("request",request);
        this.http.post(url+'/actualizar_empleado', JSON.stringify(request),{ headers: headeres })
          .subscribe(
            data => {
              resolve(data);
              console.log(data);
            },
            err => {
              
              console.log("Error occured"+err.message);
            }
          );
    
  });
  }

  public Recarga(request){
    return new Promise((resolve, reject)=>{
      let headeres = new HttpHeaders();
      headeres = headeres.set('Content-Type', 'application/json; charset=utf-8');
      
        var url = this.apiUrl;
        // credentials.email.replace("","="); 
        // credentials.password.replace(/['"]+/g, '2'); 

        console.log("request",request);
        this.http.post(url+'/peticion', JSON.stringify(request),{ headers: headeres })
          .subscribe(
            data => {
              resolve(data);
              console.log(data);
            },
            err => {
              
              console.log("Error occured"+err.message);
            }
          );
    
  });
  }
}
