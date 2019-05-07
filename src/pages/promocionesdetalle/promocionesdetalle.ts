import { CategoriasProvider } from './../../providers/categorias/categorias';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController ,ModalController} from 'ionic-angular';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';

/**
 * Generated class for the PromocionesdetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promocionesdetalle',
  templateUrl: 'promocionesdetalle.html',
})
export class PromocionesdetallePage {
  id_promocion;
  loader;
  datos:any= [];

  constructor(
    public alertController:AlertController,
    public categoriasProvider:CategoriasProvider,
    public loadingController:LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
     public navParams: NavParams) {

    console.log("id_promocion",this.id_promocion = navParams.get("id_promocion"));
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromocionesdetallePage');
  }

  ngOnInit() {
    this.getProducto();
    console.log('ngOnInit PromocionesdetallePage');
    
  }

  
  getProducto(){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.categoriasProvider.getPromocionesDetalles(this.id_promocion)
      .then(data => {
        this.datos = data;
       
        console.log(this.datos);
        this.loader.dismiss();
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

  presentModal(id) {
    console.log('id_promocion',id)
    let profileModal = this.modalCtrl.create(ModaldeportePage,{
      id_promociones:id
    });
    profileModal.present();
  }
}
