import { PerfilProvider } from './../../providers/perfil/perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditarperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editarperfil',
  templateUrl: 'editarperfil.html',
})
export class EditarperfilPage {
datos:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public PerfilProvider: PerfilProvider) {
      this.getUser(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarperfilPage');
  }

  getUser(id){
    this.PerfilProvider.getUser(id)
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    })
  }

}
