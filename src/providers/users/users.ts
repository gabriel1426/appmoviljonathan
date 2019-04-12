import { IonicPage,NavController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core'; 
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://www.api.avantisoluciones.com/public/';
@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient,private alertController:AlertController) {
    console.log('Hello UsersProvider Provider');
  }

   
  public navCtrl: NavController;
  ;

login(credentials){
    return new Promise((resolve, reject)=>{
      let headeres = new HttpHeaders();
      headeres = headeres.set('Content-Type', 'application/json; charset=utf-8');
      
    if (credentials.email === "" || credentials.password === "") {
        reject({message:"El usuario y contraseña son obligatorios"})
    } else {
      
        var body = {
            session:credentials
        }
        var url = apiUrl + 'login';
        // credentials.email.replace("","="); 
        // credentials.password.replace(/['"]+/g, '2'); 

        console.log("credentials",credentials);
        this.http.post(url, JSON.stringify(credentials),{ headers: headeres })
          .subscribe(
            data => {
              resolve(data);
             
              console.log(data);
            },
            err => {
              Inject(err);
              let alert1 = this.alertController.create({
                title: 'Error!',
                subTitle: 'El usuario o la contraseña son incorrectas!',
              buttons: ['OK']
              });
              alert1.present();
              // console.log("Error occured"+credentials.email+credentials.password);
            }
          );
    }
  });
}


public correocontrasena(email) {
  // id establecimiento
  return new Promise(resolve => {
    this.http.get(apiUrl+'/correocontrasena/'+email).subscribe(data => {
      resolve(data);
    }, err => {
      Inject(err);
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'El correo es incorrecto!',
      buttons: ['OK']
      });
      alert1.present();
    });
  });
}


}
