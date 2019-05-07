import { PagarProvider } from './../../providers/pagar/pagar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,AlertController,LoadingController} from 'ionic-angular';
import { Pin2Page } from '../pin2/pin2';



/**
 * Generated class for the ValorapagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valorapagar',
  templateUrl: 'valorapagar.html',
})
export class ValorapagarPage {
qr;
datos1:any=[];
datos:any=[];
loader;
  cantidad_cuota;
  total;
  id_sucursal;
codigo ;
fechasinprocesar;
fechaprocesada;
profileModal;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public PagarProvider:PagarProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
    console.log("qr",this.qr = navParams.get("qr"));
    // console.log("qr",this.qr ="suc032");
    this.fechasinprocesar= new Date();
    console.log(this.fechaprocesada = this.fechasinprocesar.getDate() + "-" + (this.fechasinprocesar.getMonth() +1) + "-" + this.fechasinprocesar.getFullYear());
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValorapagarPage');
  }
  ngOnInit() {
    this.buscarqr(this.qr);
  }

  confirmarpago(){

    console.log("this.codigo",this.codigo);
    console.log("this.cantidad_cuota",this.cantidad_cuota);
    console.log("this.total",this.total);
    console.log("this.id_sucursal",this.id_sucursal);
    console.log("this.fechaprocesada",this.fechaprocesada);
    console.log(this.codigo = Math.floor(Math.random()* (9999 - 1000)));
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    console.log("Codigo + Email",this.codigo,localStorage["email"]);
    this.PagarProvider.pin(this.codigo,localStorage["email"])
    .then(data => {
      this.datos1 = data;
      console.log(this.datos1);
      this.loader.dismiss();
      this.profileModal = this.modalCtrl.create(Pin2Page,{
        pin:this.codigo,
        cantidad_cuota:this.cantidad_cuota,
        valor_actual:this.total,
        // id_sucursal:this.id_sucursal,
        fechaprocesada:this.fechaprocesada,
        id_sucursal:this.datos.id,
        // cantidad1:this.contador,
      });
      this.profileModal.present().then((resolve)=>{
        this.viewCtrl.dismiss();
      });
      
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

  buscarqr(qr){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    console.log("qr",qr);
    this.PagarProvider.dataqr(qr)
    .then(data => {
      this.datos = data;
      this.datos = this.datos.data;
      console.log("datos qr",this.datos);
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
