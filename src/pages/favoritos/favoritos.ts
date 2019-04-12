import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';
import { ProductoPage } from '../producto/producto';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var datos;
@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  id_categoria;
  datos:any=[];
  datos1:any=[];
  corazon=0;
  constructor(
    public CategoriasProvider:CategoriasProvider,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController) {
      
  }
  producto(id){
    console.log(id)
    this.navCtrl.push(ProductoPage,{
      id_sucursal:id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritosPage');
  }
  ngOnInit(){
   
  }
  indexfavoritos(){
    this.CategoriasProvider.indexfavoritos(localStorage["id_empleado"])
    .then(data => {
      this.datos = data;
      console.log("datos1",this.datos1);
    })
  
  }

  ionViewWillEnter(){
    this.indexfavoritos();
  }

  estadoCorazon(id_sucursal,estado){

    this.CategoriasProvider.ActualizarFavoritos(localStorage["id_empleado"],id_sucursal,estado)
    .then(data => {
      this.datos1 = data;
     this.indexfavoritos();
      console.log("datos1",this.datos1);
    })
  }

}
