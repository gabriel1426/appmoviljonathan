import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { CompraexitosaPage } from '../compraexitosa/compraexitosa';

/**
 * Generated class for the CompraenlineaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compraenlinea',
  templateUrl: 'compraenlinea.html',
})
export class CompraenlineaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraenlineaPage');
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(CompraexitosaPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
