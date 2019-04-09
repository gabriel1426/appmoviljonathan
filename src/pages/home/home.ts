import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import { PromocionesPage } from '../promociones/promociones';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';
import { HomeProvider } from '../../providers/home/home';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 id_promociones;
  datos:any= [];
nombre;
monto;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
     public HomeProvider:HomeProvider) {
    this.getPromociones();
    this.nombre = localStorage["nombre"];
    this.monto = localStorage["monto"];

  }
  getPromociones() {
    this.HomeProvider.getCategorias()
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    })
  }

  verpromociones(){
   
    this.navCtrl.push(PromocionesPage);
  }

  presentModal(id) {
    console.log('id_promocion',id)
    let profileModal = this.modalCtrl.create(ModaldeportePage,{
      id_promociones:id
    });
    profileModal.present();
  }
 



}
