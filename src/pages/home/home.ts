import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import { PromocionesPage } from '../promociones/promociones';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 

  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {

  }


  verpromociones(){
   
    this.navCtrl.push(PromocionesPage);
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(ModaldeportePage);
    profileModal.present();
  }
 



}
