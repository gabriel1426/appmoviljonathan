import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController,AlertController,LoadingController } from 'ionic-angular';
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
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
     public HomeProvider:HomeProvider) {
    this.getPromociones();
    this.nombre = localStorage["nombre"];
    this.monto = localStorage["monto"];

  }
  getPromociones() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.HomeProvider.getCategorias()
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    },err =>{
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'No pudo conectar con el servidor!',
      buttons: ['OK']
      });
      alert1.present();
      this.loader.dismiss();
    })
    this.loader.dismiss();
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
