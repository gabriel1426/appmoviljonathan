import { EstablecimientosPage } from './../establecimientos/establecimientos';
import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController, Select } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ComercioPage } from '../comercio/comercio';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { SelectSearchableComponent } from 'ionic-select-searchable';
/**
 * Generated class for the CotegoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Port {
  public id: number;
  public name: string;
}
declare var google:any;
var map;
var infoWindow;
var infowindow;
var service;
var pos;
var datos;
var datos2;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ciudades;
@IonicPage()
@Component({
  selector: 'page-cotegorias',
  templateUrl: 'cotegorias.html',
})
export class CotegoriasPage {

 
 buscar= true;
 lupa=true;
 @ViewChild('sectionSelect') sectionSelect: Select;
 @ViewChild('map') mapElement: ElementRef
 @ViewChild(Slides) slides: Slides;
 map: any;
 datos:any= [];
 datos1:any= [];
 pos1:any;
 nombre;
 loader;
items;
pos:any=[];
 searchTerm: string ;
filterItems:any=[];
posicion:any=[];
id_ciudad;
ciudades:any=[];
data: any;
categorias: string[];
errorMessage: string;
page = 1;
perPage = 0;
totalData = 0;
totalPage = 0;
port: Port;
  nombre_ciudad: any;
  constructor( 
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public CategoriasProvider:CategoriasProvider) {
      this.ciudades_categorias();
    console.log('CotegoriasPage');
   }
  ionViewDidLoad() {
   
    console.log('ionViewDidLoad CotegoriasPage');
    // this.loadMap();
    // document.getElementById('mostrarPromos').style.display="none";
    // this.slides.lockSwipes(false);
   
  }
  doFilter(){
    this.sectionSelect.open();
    console.log('hello')
 }
ngOnInit(){
  // this.datos1=[];
  console.log("ngOnInit()");
  this.getCategorias();
  // document.getElementById('mostrarPromos').style.display="none";
}
  ngAfterViewInit() {
   
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave");
    // this.datos1=[];
    // document.getElementById('mostrarPromos').style.visibility="hidden";
    // this.buscar=true;
  }

  getCategorias() {
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.getCategorias()
    .then(data => {
      
      datos=data;
      console.log("datos",this.datos = datos.data.data);
      
      this.filterItems =  this.datos;
      // this.nombre = datos.data.descripcion;
      console.log("datos data categorias", this.datos);
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


  getEstablecimiento() {
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.getEstablecimiento()
    .then(data => {
      this.datos1 = data;
    
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

  buscarboton(){
    document.getElementById('mostrarPromos').style.display="block";
    console.log("buscarboton()");
    if(this.buscar){
      document.getElementById('mostrarPromos').style.visibility="hidden";
      this.slides.slideTo(1, 200);
      console.log(this.buscar);
    }
  }
  buscarboton2(){
    console.log("buscarboton2()");
    if(!this.buscar){
      document.getElementById('mostrarPromos').style.visibility="hidden";
      this.slides.slideTo(0, 200);
      console.log(this.buscar);
    }
    
   }

   
    setFilteredItems(){
      this.datos = this.filterItems.filter(
        item =>  item.descripcion.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
       )
       console.log(this.datos);
      }
      setFilteredItems_ciudad(ciudad){
        this.datos = this.filterItems.filter(
          item =>  item.ciudad.toLowerCase().indexOf(ciudad.toLowerCase()) > -1
         )
         console.log(this.datos);
        }
   buscarlupa(){
     this.lupa=false;
     console.log("entre");
   }
   cerrarlupa(){
    this.lupa=true;
   }

   
  comercio(id){
    this.navCtrl.push(EstablecimientosPage,{
      id_categoria:id,
      id_ciudad:this.id_ciudad,
      nombre_ciudad:this.nombre_ciudad
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //ur function e.g getPostWordPress()
    this.getEstablecimiento();
     this.getCategorias();
     this.ciudades_categorias();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);}
  
    doInfinite(infiniteScroll){
      console.log("entroalinfinite");
      this.page = this.page+1;
      setTimeout(() => {
        this.CategoriasProvider.getCategorias()
        .then(data => {
             datos2 = data;
             this.data= datos2.data.data;
              //  this.data = data;
               console.log("per page",this.perPage = this.data.per_page);
               console.log("totaldata",this.totalData = this.data.total);
               console.log("total page",this.totalPage = this.data.total_pages);
               for(let i=0; i<this.data.data.length; i++) {
                 this.datos.push(this.data.data[i]);
               }
             },
             error =>  this.errorMessage = <any>error);
    
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 100);
    }

    portChange(event: {
      component: SelectSearchableComponent,
      value: any 
      }) {
        this.id_ciudad = event.value.id;
        this.nombre_ciudad = event.value.descripcion;
          console.log('id ciudad:', event.value.id);
          console.log('nombre ciudad:', event.value.descripcion);
          this.setFilteredItems_ciudad(this.nombre_ciudad);
      }

    ciudades_categorias(){
      this.loader = this.loadingController.create({
        content: "Espera por favor...",
      });
      this.loader.present();
      this.CategoriasProvider.ciudades_categorias()
      .then(data => {
        ciudades = data;
        this.ciudades = ciudades.data;
        console.log("ciudaes this.ciudades",this.ciudades);

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
