import { CategoriasProvider } from './../../providers/categorias/categorias';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MapaPage page.
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
var datos2;
var markers = [];
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  id_establecimiento;
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


data: any;
categorias: string[];
errorMessage: string;
page = 1;
perPage = 0;
totalData = 0;
totalPage = 0;
nombre_establecimiento;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public CategoriasProvider:CategoriasProvider
    ) {
    console.log("id_categoria",this.id_establecimiento = navParams.get("id_establecimiento"));
    console.log("id_categoria",this.nombre_establecimiento = navParams.get("nombre_establecimiento"));
   
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad MapaPage');
    this.loadMap();
    // this.getEstablecimiento(this.id_establecimiento) 
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
        var location = new google.maps.LatLng(pos.lat, pos.lng);
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Hello World!'
        });
        infoWindow.setPosition(pos);
        infoWindow.setContent('Ubicación encontrada.');
        infoWindow.open(map);
        map.setCenter(pos);
        // this.geocodeLatLng(geocoder, map, infowindow,pos);
      }, function() {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
     // Browser doesn't support Geolocation
    }
    this.getEstablecimiento(this.id_establecimiento) 
  }

  addMarker(location, map) {
    console.log(location)
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }

  // geocodeLatLng(geocoder, map, infowindow,pos) {
  //   console.log('pos',pos);
  //   var latlng = pos;
  //   geocoder.geocode({'location': latlng}, function(results, status) {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         map.setZoom(11);
  //         var marker = new google.maps.Marker({
  //           position: latlng,
  //           map: map
  //         });
  //         infowindow.setContent(results[0].formatted_address);
  //         infowindow.open(map, marker);
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  getEstablecimiento(id) {

    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.CategoriasProvider.getSucursalesEstablecimiento(id)
    .then(data => {
      this.datos1 = data;
      this.pos = this.datos1.data;
     
      console.log("antes del foreach",this.pos);
    this.pos.forEach(element => {
      console.log("elemento",element.latitud);
      pos = {
        lat: parseFloat(element.latitud),
        lng: parseFloat(element.longitud)
      };
      var contentString = element.nombre + '<br>'+
      element.direccion;
console.log ("contentString", contentString);
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
       
      });
      infowindow = new google.maps.InfoWindow;
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      markers.push(marker);
    //   markers.reduce(function (pos, curr) {

    //     var cpos = map.geometry.spherical.computeDistanceBetween(location, curr.position);
    //     var ppos = map.geometry.spherical.computeDistanceBetween(location, pos.position);
    
    //     return cpos < ppos ? curr : prev;
    
    // }).position
    });
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
