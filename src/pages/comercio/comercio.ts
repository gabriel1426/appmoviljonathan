import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';





/**
 * Generated class for the ComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comercio',
  templateUrl: 'comercio.html',
})
export class ComercioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComercioPage');
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(ModalcomercioPage);
    profileModal.present();
  }
 
}
