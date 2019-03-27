import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValorapagarPage } from '../valorapagar/valorapagar';

/**
 * Generated class for the PagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagar',
  templateUrl: 'pagar.html',
})
export class PagarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarPage');
    
  }

  pagar(){
    this.navCtrl.push(ValorapagarPage);
  }

}