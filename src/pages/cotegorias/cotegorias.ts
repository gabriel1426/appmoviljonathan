import { Component ,ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ComercioPage } from '../comercio/comercio';


/**
 * Generated class for the CotegoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var map;
declare var google:any;
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
  constructor( public navCtrl: NavController, public navParams: NavParams) {
    
   }
  ionViewDidLoad() {
   
    console.log('ionViewDidLoad CotegoriasPage');
    this.loadMap();
    document.getElementById('mostrarPromos').style.visibility="hidden";
    this.slides.lockSwipes(false);
  }

  ngAfterViewInit() {
   
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
   buscarlupa(){
     this.lupa=false;
     console.log("entre");
   }
   cerrarlupa(){
    this.lupa=true;
   }

  loadMap(){
    const location= new google.maps.LatLng(7.8939100,-72.5078200);
    const options={
      center:location,
      zoom:14
    }
    map = new google.maps.Map(document.getElementById('map'),options);
   
  }
  
  comercio(){
    this.navCtrl.push(ComercioPage);
  }

}
