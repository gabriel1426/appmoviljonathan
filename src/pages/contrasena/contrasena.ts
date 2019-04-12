import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
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
  constructor(public usersprovider:UsersProvider,
    public navCtrl: NavController,
    private alertController:AlertController,
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
    this.usersprovider.correocontrasena(this.email)
    .then(data => {
     
      this.datos = data;
      let alert1 = this.alertController.create({
        title: 'Exito!',
        subTitle: 'Mensaje Enviado con exito!',
      buttons: ['OK']
      });
      alert1.present();
      this.navCtrl.pop();
    },err => {
      
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'El correo es incorrecto!',
      buttons: ['OK']
      });
      alert1.present();
     
    })
  }


}
