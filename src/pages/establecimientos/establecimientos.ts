
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController,LoadingController } from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';
import { ProductoPage } from '../producto/producto';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { ComercioPage } from '../comercio/comercio';
import { MapaPage } from '../mapa/mapa';




/**
 * Generated class for the ComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var datos;
@IonicPage()
@Component({
  selector: 'page-establecimientos',
  templateUrl: 'establecimientos.html',
})
export class EstablecimientosPage {
id_categoria;
datos:any=[];
datos1:any=[];
filterItems:any=[];
corazon=0;
loader;
categoria;
  nombre_ciudad: any;
  id_ciudad: any;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public CategoriasProvider:CategoriasProvider,
    public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController) {
    console.log("id_categoria",this.id_categoria = navParams.get("id_categoria"));
    console.log("id_ciudad",this.id_ciudad = navParams.get("id_ciudad"));
    console.log("nombre_ciudad",this.nombre_ciudad = navParams.get("nombre_ciudad"));
    this.getEstablecimientoCategoria(this.id_categoria)

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstablecimientosPage');
  }
 setFilteredItems_ciudad(ciudad){
        this.datos = this.filterItems.filter(
          item =>  item.ciudad.toLowerCase().indexOf(ciudad.toLowerCase()) > -1
         )
         console.log("datos del filtro",this.datos);
        }
getEstablecimientoCategoria(id){
  this.loader = this.loadingController.create({
    content: "Espera por favor...",
  });
  this.loader.present();
  this.CategoriasProvider.getEstablecimientoCategoria(id)
    .then(data => {
      this.datos = data;
      this.datos = this.datos.data;
      this.categoria = data;
      this.categoria = this.categoria.categoria;
      this.filterItems =  this.datos;
      this.loader.dismiss();
      console.log(this.datos);
      if(this.nombre_ciudad  != '' || this.nombre_ciudad != undefined){
        console.log("this.nombre_ciudad",this.nombre_ciudad)
        this.setFilteredItems_ciudad(this.nombre_ciudad);
      }else{
        console.log("this.nombre_ciudad",this.nombre_ciudad)
      }
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
    this.navCtrl.push(ComercioPage,{
      id_establecimiento:id,
      id_ciudad:this.id_ciudad,
      nombre_ciudad:this.nombre_ciudad
    });
  }

  verpromociones(){
    
  }
  // ActualizarFavoritos(id_sucursal,estado){
    
  // }

  vermapa(id_establecimiento,nombre_establecimiento){
    console.log("id_sucursal", id_establecimiento);
    
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();

    this.navCtrl.push(MapaPage,{
      id_establecimiento:id_establecimiento,
      nombre_establecimiento:nombre_establecimiento
    });


    this.loader.dismiss();
  }
 
}
