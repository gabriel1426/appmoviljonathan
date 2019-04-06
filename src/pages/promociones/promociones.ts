import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';
import { HomeProvider } from '../../providers/home/home';

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {
datos:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, public HomeProvider:HomeProvider) {
  this.getPromociones();

  }
  getPromociones() {
    this.HomeProvider.getCategorias()
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesPage');
  }

  presentModal(id) {
    console.log('id_promocion',id)
    let profileModal = this.modalCtrl.create(ModaldeportePage,{
      id_promociones:id
    });
    profileModal.present();
  }
 

}
