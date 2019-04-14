import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';

/**
 * Generated class for the FormulariocompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulariocompra',
  templateUrl: 'formulariocompra.html',
})
export class FormulariocompraPage {

  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulariocompraPage');
  }

}
