import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController} from 'ionic-angular';
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
    constructor(public navCtrl: NavController, 
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
      this.HomeProvider.getDetallePromocion(id)
      .then(data => {
        this.datos = data;
       
        console.log(this.datos);
      })
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
