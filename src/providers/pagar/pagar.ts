import { IonicPage,NavController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { LoginPage } from '../../pages/login/login';


/*
  Generated class for the PagarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://www.api.avantisoluciones.com/public';
@Injectable()
export class PagarProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PagarProvider Provider');
  }

  public navCtrl: NavController;
  private alertCtrl:AlertController;
  
factura(factura){
  return new Promise((resolve, reject)=>{
    let headeres = new HttpHeaders();
    headeres = headeres.set('Content-Type', 'application/json; charset=utf-8');
    
  if (factura.email === "" || factura.password === "") {
      reject({message:"El usuario y contraseña son obligatorios"})
  } else {
    
      var body = {
          session:factura
      }
      var url = apiUrl+'/crear/factura';
      // credentials.email.replace("","="); 
      // credentials.password.replace(/['"]+/g, '2'); 

      console.log("credentials",factura);
      this.http.post(url, JSON.stringify(factura),{ headers: headeres })
        .subscribe(
          data => {
            resolve(data);
           
            console.log(data);
          },
          err => {
            // this.navCtrl.setRoot(LoginPage);
            console.log("Error occured");
          }
        );
  }
});
}

dataqr(qr){
   // qr de establecimiento
   return new Promise(resolve => {
    this.http.get(apiUrl+'/dataqr/'+qr).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
buscarqr(qr){
  // qr de establecimiento
  return new Promise(resolve => {
   this.http.get(apiUrl+'/buscarqr/'+qr).subscribe(data => {
     resolve(data);
   }, err => {
     console.log(err);
   });
 });
}


pin(codigo,email){
  // qr de establecimiento
  return new Promise(resolve => {
   this.http.get(apiUrl+'/pin/'+codigo+'/'+email).subscribe(data => {
     resolve(data);
   }, err => {
     console.log(err);
   });
 });
}

showfactura(id){
  // qr de establecimiento
  return new Promise(resolve => {
   this.http.get(apiUrl+'/factura/'+id).subscribe(data => {
     resolve(data);
   }, err => {
     console.log(err);
   });
 });
}

formulario(id){
  return new Promise(resolve => {
    this.http.get(apiUrl+'/formulario/factura/'+id).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

}
