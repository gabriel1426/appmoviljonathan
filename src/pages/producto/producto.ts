import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController ,AlertController,LoadingController} from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';
import { CategoriasProvider } from '../../providers/categorias/categorias';


/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  id_sucursal;
  datos:any=[];
  loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public CategoriasProvider:CategoriasProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
      console.log("id_sucursal",this.id_sucursal = navParams.get("id_sucursal"));
      this.getProducto(this.id_sucursal)
  }
 
  ionViewDidLoad() {
   
    console.log('ionViewDidLoad ProductoPage');
  }
  ngOnInit() {
    
    console.log('ngOnInit ProductoPage');
  }

  getProducto(id){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.getProducto(id)
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
    let profileModal = this.modalCtrl.create(ModalcomercioPage,{
        id_producto:id
    });
    profileModal.present();
  }

}
