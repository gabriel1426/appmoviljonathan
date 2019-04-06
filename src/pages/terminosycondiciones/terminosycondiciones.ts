import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
/**
 * Generated class for the TerminosycondicionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terminosycondiciones',
  templateUrl: 'terminosycondiciones.html',
})
export class TerminosycondicionesPage {

  constructor(
    public navCtrl: NavController,  
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public HomeProvider:HomeProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerminosycondicionesPage');
  }
  cerrarmodal(){
    this.viewCtrl.dismiss();
  }

}
