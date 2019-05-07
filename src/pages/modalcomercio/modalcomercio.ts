import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController,AlertController,LoadingController} from 'ionic-angular';
import { CompraenlineaPage } from '../compraenlinea/compraenlinea';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the ModalcomercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalcomercio',
  templateUrl: 'modalcomercio.html',
})
export class ModalcomercioPage {
  id_producto;
  datos:any=[];
  loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public CategoriasProvider:CategoriasProvider,public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public modalCtrl: ModalController) {
    console.log("id_producto",this.id_producto = navParams.get("id_producto"));
    this.getProductoDellate(this.id_producto)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalcomercioPage');
  }

  cerrarmodal(){
    this.viewCtrl.dismiss();
  }
  getProductoDellate(id){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.getProductoDellate(id)
      .then(data => {
        this.datos = data;
        this.loader.dismiss();
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
    console.log("id producto",id)
    let profileModal = this.modalCtrl.create(CompraenlineaPage,{
      id_producto:id
    });
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });

}


}
