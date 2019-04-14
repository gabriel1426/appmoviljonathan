import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController,AlertController,LoadingController} from 'ionic-angular';
import { CompraenlineaPage } from '../compraenlinea/compraenlinea';
import { HomeProvider } from '../../providers/home/home';
/**
 * Generated class for the ModaldeportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modaldeporte',
  templateUrl: 'modaldeporte.html',
})
export class ModaldeportePage {
  id_promociones;
  datos:any=[];
  loader;
    constructor(
      private alertController:AlertController,
      private loadingController:LoadingController, 
      public navCtrl: NavController, 
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public HomeProvider:HomeProvider) {
        this.id_promociones = navParams.get("id_promociones");
        this.getDetallePromocion(this.id_promociones);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ModaldeportePage');
    }

    cerrarmodal(){
      this.viewCtrl.dismiss();
    }

    getDetallePromocion(id){
      this.loader = this.loadingController.create({
        content: "Please wait...",
      });
      this.loader.present();
      this.HomeProvider.getDetallePromocion(id)
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

    comprar(id){
      console.log("id_producto",id);
      let profileModal = this.modalCtrl.create(CompraenlineaPage,{
        id_producto:id
      });
      profileModal.present().then((resolve)=>{
        this.viewCtrl.dismiss();
      });

  }
  }
