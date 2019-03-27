import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController} from 'ionic-angular';
import { CompraenlineaPage } from '../compraenlinea/compraenlinea';


/**
 * Generated class for the ModalcomercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalcomercio',
  templateUrl: 'modalcomercio.html',
})
export class ModalcomercioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalcomercioPage');
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
