import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,LoadingController,AlertController } from 'ionic-angular';

/**
 * Generated class for the ComfirmaciondepagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comfirmaciondepago',
  templateUrl: 'comfirmaciondepago.html',
})
export class ComfirmaciondepagoPage {

  constructor(
    public LoadingController:LoadingController,
    private alertController:AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComfirmaciondepagoPage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  

}
