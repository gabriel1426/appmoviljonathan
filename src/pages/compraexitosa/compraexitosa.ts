import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the CompraexitosaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compraexitosa',
  templateUrl: 'compraexitosa.html',
})
export class CompraexitosaPage {
  datos;
  contador;
  valor_actual;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    console.log("datos",this.datos = navParams.get("datos"));
    console.log("contador",this.contador = navParams.get("contador"));
    console.log("valor_actual",this.datos = navParams.get("valor_actual"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraexitosaPage');
  }
  

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
