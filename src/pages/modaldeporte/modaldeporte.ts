import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController} from 'ionic-angular';
import { CompraenlineaPage } from '../compraenlinea/compraenlinea';
/**
 * Generated class for the ModaldeportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modaldeporte',
  templateUrl: 'modaldeporte.html',
})
export class ModaldeportePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModaldeportePage');
  }

  cerrarmodal(){
    this.viewCtrl.dismiss();
  }

  comprar(){
    let profileModal = this.modalCtrl.create(CompraenlineaPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });

}
}
