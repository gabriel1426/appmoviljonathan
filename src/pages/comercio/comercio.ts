import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
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
id_categoria;
datos:any=[];
datos1:any=[];
corazon=0;
  constructor(
    public CategoriasProvider:CategoriasProvider,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController) {
    console.log("id_categoria",this.id_categoria = navParams.get("id_categoria"));

    this.getSucursales(this.id_categoria)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComercioPage');
  }

getSucursales(id){
  this.CategoriasProvider.getSucursales(id)
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    })
}


 

  producto(id){
    console.log(id)
    this.navCtrl.push(ProductoPage,{
      id_sucursal:id
    });
  }

  verpromociones(){
    
  }
  ActualizarFavoritos(id_sucursal,estado){
    
  }

  estadoCorazon(id_sucursal,estado){

    this.CategoriasProvider.ActualizarFavoritos(localStorage["id_empleado"],id_sucursal,estado)
    .then(data => {
      this.datos1 = data;
     this.getSucursales(this.id_categoria)
      console.log("datos1",this.datos1);
    })
  }
 
}
