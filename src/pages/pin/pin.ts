import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController , ModalController} from 'ionic-angular';
import { ComfirmaciondepagoPage } from '../comfirmaciondepago/comfirmaciondepago';
/**
 * Generated class for the PinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PinPage');
  }

  confirmar(){
    let profileModal = this.modalCtrl.create(ComfirmaciondepagoPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });
  }
  cerrar(){
    this.viewCtrl.dismiss();
  }

}
