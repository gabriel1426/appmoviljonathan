import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,LoadingController } from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';
import { ProductoPage } from '../producto/producto';
import { CategoriasProvider } from '../../providers/categorias/categorias';




/**
 * Generated class for the ComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var datos;
@IonicPage()
@Component({
  selector: 'page-comercio',
  templateUrl: 'comercio.html',
})
export class ComercioPage {
id_establecimiento;
datos:any=[];
datos1:any=[];
corazon=0;
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public CategoriasProvider:CategoriasProvider,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController) {
    console.log("id_categoria",this.id_establecimiento = navParams.get("id_establecimiento"));
    this.getSucursales(this.id_establecimiento)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComercioPage');
  }

getSucursales(id){
  this.loader = this.loadingController.create({
    content: "Espera por favor...",
  });
  this.loader.present();
  this.CategoriasProvider.getSucursales(id)
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


 

  producto(id){
    console.log(id)
    this.navCtrl.push(ProductoPage,{
      id_sucursal:id
    });
  }

  verpromociones(){
    
  }
  // ActualizarFavoritos(id_sucursal,estado){
    
  // }

  estadoCorazon(id_sucursal,estado){
    console.log("id_sucursal", id_sucursal);
    console.log("estado", estado)
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.ActualizarFavoritos(localStorage["id_empleado"],id_sucursal,estado)
    .then(data => {
      this.datos1 = data;
     this.getSucursales(this.id_establecimiento)
      console.log("datos1",this.datos1);
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
 
}
