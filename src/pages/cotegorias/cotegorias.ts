import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ComercioPage } from '../comercio/comercio';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/**
 * Generated class for the CotegoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;
var map;
var infoWindow;
var infowindow;
var service;
var pos;
var datos;
@IonicPage()
@Component({
  selector: 'page-cotegorias',
  templateUrl: 'cotegorias.html',
})
export class CotegoriasPage {

 
 buscar= true;
 lupa=true;

 @ViewChild('map') mapElement: ElementRef
 @ViewChild(Slides) slides: Slides;
 map: any;
 datos:any= [];
 datos1:any= [];
 pos1:any;
 nombre;
 loader;
items;
 searchTerm: string ;
filterItems:any=[];
  constructor( 
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public CategoriasProvider:CategoriasProvider) {
    this.getCategorias();
    this.getEstablecimiento();
    console.log('hola');
   }
  ionViewDidLoad() {
   
    console.log('ionViewDidLoad CotegoriasPage');
    this.loadMap();
    document.getElementById('mostrarPromos').style.visibility="hidden";
    this.slides.lockSwipes(false);
   
  }

  ngAfterViewInit() {
   
  }

  getCategorias() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.CategoriasProvider.getCategorias()
    .then(data => {
      
      datos=data;
      this.datos = datos.data;
      this.filterItems =  this.datos;
      // this.nombre = datos.data.descripcion;
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
  getEstablecimiento() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.CategoriasProvider.getEstablecimiento()
    .then(data => {
      this.datos1 = data;
      
      console.log(this.datos1);
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
    if(this.buscar){
     
      this.slides.slideTo(1, 200);
      console.log(this.buscar);
    }
  }
  buscarboton2(){
    if(!this.buscar){
      document.getElementById('mostrarPromos').style.visibility="hidden";
      this.slides.slideTo(0, 200);
      console.log(this.buscar);
    }
    
   }
   slideChanged(){
     console.log("cambio")
    if(this.buscar){
      document.getElementById('mostrarPromos').style.visibility="visible";
      this.buscar=false;
    
      
    }else{
      document.getElementById('mostrarPromos').style.visibility="hidden";
      this.buscar=true;
      
    }
   }
   
    setFilteredItems(){
      this.datos = this.filterItems.filter(
        item =>  item.descripcion.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
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
    this.navCtrl.push(ComercioPage,{
      id_categoria:id
    });
  }


   loadMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
    infoWindow = new google.maps.InfoWindow;
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
       
        

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        // this.geocodeLatLng(geocoder, map, infowindow,pos);
      }, function() {
        this.handleLocationError(true, infoWindow, map.getCenter());
        
      });
    } else {
      // Browser doesn't support Geolocation
      
    }
   
      
  }

  geocodeLatLng(geocoder, map, infowindow,pos) {
    console.log('pos',pos);
    var latlng = pos;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


  
}
