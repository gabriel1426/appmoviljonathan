import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController,LoadingController} from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
/**
 * Generated class for the ContrasenaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contrasena',
  templateUrl: 'contrasena.html',
})
export class ContrasenaPage {
datos:any=[];
email="";
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    public usersprovider:UsersProvider,
    public navCtrl: NavController,
    
     public navParams: NavParams) {
  }

  aceptar(){
    this.navCtrl.pop();
  }

  cancelar(){
    this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContrasenaPage');
  }

  cambiarcontrasena(){
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.usersprovider.correocontrasena(this.email)
    .then(data => {
     
      this.datos = data;
      let alert1 = this.alertController.create({
        title: 'Exito!',
        subTitle: 'Mensaje Enviado con exito!',
      buttons: ['OK']
      });
      this.loader.dismiss();
      alert1.present();
      this.navCtrl.pop();
    },err =>{
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'No pudo conectar con el servidor!',
      buttons: ['OK']
      });
      alert1.present();
      this.loader.dismiss();
    })
    this.loader.dismiss();
  }


}
