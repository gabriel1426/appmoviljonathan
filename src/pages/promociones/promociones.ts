import { PromocionesdetallePage } from './../promocionesdetalle/promocionesdetalle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,AlertController, LoadingController} from 'ionic-angular';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';
import { HomeProvider } from '../../providers/home/home';
import { TerminosycondicionesPage } from '../terminosycondiciones/terminosycondiciones';

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
loader;
  constructor(
  private alertController:AlertController,
  private loadingController:LoadingController, 
  public navCtrl: NavController,
  public navParams: NavParams,
  public modalCtrl: ModalController,
  public HomeProvider:HomeProvider) {
 

  }
  ngOnInit() {
    this.getPromociones();
  }
  getPromociones() {
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.HomeProvider.getCategorias()
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesPage');
  }

  detallepromociones(id){
    this.navCtrl.push(PromocionesdetallePage,{
      id_promocion:id
    });
  }

  presentModal(id) {
    console.log('id_promocion',id)
    let profileModal = this.modalCtrl.create(ModaldeportePage,{
      id_promociones:id
    });
    profileModal.present();
  }

  presentModal2(id) {
    console.log('id_establecimiento',id)
    let profileModal = this.modalCtrl.create(TerminosycondicionesPage,{
      id_establecimiento:id
    });
    profileModal.present();
  }
 

}
