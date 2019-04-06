import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { CompraexitosaPage } from '../compraexitosa/compraexitosa';
import { TerminosycondicionesPage } from '../terminosycondiciones/terminosycondiciones';
import { HomeProvider } from '../../providers/home/home';
/**
 * Generated class for the CompraenlineaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var cantidad_venta;
@IonicPage()
@Component({
  selector: 'page-compraenlinea',
  templateUrl: 'compraenlinea.html',
})
export class CompraenlineaPage {
  id_promociones;
  fechasinprocesar;
  fechaprocesada;
  datos:any=[];
  contador;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public viewCtrl: ViewController,
     public HomeProvider:HomeProvider) {
    console.log("id_promociones",this.id_promociones = navParams.get("id_promociones"));
    this.getProductoAComprar(this.id_promociones);
    
    this.fechasinprocesar= new Date();
    this.contador=1;
console.log(this.fechaprocesada = this.fechasinprocesar.getDate() + "-" + (this.fechasinprocesar.getMonth() +1) + "-" + this.fechasinprocesar.getFullYear());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraenlineaPage');
  }

  presentModal() {
    let profileModal = this.modalCtrl.create(CompraexitosaPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });
  }

  presentModalTerminos(id){
    this.navCtrl.push(TerminosycondicionesPage,{
      id_establecimiento:id
    });
    // let profileModal = this.modalCtrl.create(TerminosycondicionesPage);
    // profileModal.present().then((resolve)=>{
    //   this.viewCtrl.dismiss();
    // });
  }
  getProductoAComprar(id){
    this.HomeProvider.getProductoAComprar(id)
    .then(data => {
      this.datos = data;
      var cantidad = this.datos.data;
     cantidad = cantidad['0'];
     cantidad_venta = cantidad.cantidad_venta_user;
      console.log(this.datos);
      console.log("cantidad venta user",cantidad_venta);
    })
  }
  cerrar(){
    this.viewCtrl.dismiss();
  }

  menos(){
    if(this.contador >= 2){
      this.contador = this.contador - 1;
    }
    
  }
  mas(){
    if(this.contador < cantidad_venta){
      this.contador = this.contador + 1 ;
    }
  }

}
