import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { PinPage } from '../pin/pin';



/**
 * Generated class for the ValorapagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valorapagar',
  templateUrl: 'valorapagar.html',
})
export class ValorapagarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValorapagarPage');
  }

  confirmarpago(){
    
    let profileModal = this.modalCtrl.create(PinPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });
  }

}
