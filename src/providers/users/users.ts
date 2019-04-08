import { IonicPage,NavController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://www.api.avantisoluciones.com/public/login';
@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsersProvider Provider');
  }

   
  public navCtrl: NavController


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
        var url = apiUrl;
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
              this.navCtrl.setRoot(LoginPage);
              console.log("Error occured"+credentials.email+credentials.password);
            }
          );
    }
  });
}



}
