import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';


/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesPage');
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(ModaldeportePage);
    profileModal.present();
  }
 

}
