import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ContrasenaPage } from '../contrasena/contrasena';
import { RegistroPage } from '../registro/registro';






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  recuerdame:"";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }





  public recuperarContrasena(){
    this.navCtrl.push(ContrasenaPage);

  }

  public ingresar(){
    
    this.navCtrl.setRoot(TabsPage);
  }

  public registrar(){

    this.navCtrl.push(RegistroPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
