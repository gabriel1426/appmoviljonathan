import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { CompraexitosaPage } from '../compraexitosa/compraexitosa';
import { TerminosycondicionesPage } from '../terminosycondiciones/terminosycondiciones';
import { PagarProvider } from '../../providers/pagar/pagar';
import { HomeProvider } from '../../providers/home/home';
/**
 * Generated class for the CompraenlineaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var cantidad_venta;
var valor;
var array;
@IonicPage()
@Component({
  selector: 'page-compraenlinea',
  templateUrl: 'compraenlinea.html',
})
export class CompraenlineaPage {
  id_producto;
  fechasinprocesar;
  fechaprocesada;
  datos:any=[];
  contador;
  valor_actual;
  valor
loader;
  factura= {
    total:'',
    id_empleado:'',
    venta_web:'',
    length:'',
    cantidad_cuota:'',
    descripcion_ped:" ",
    tiempo_espera:"",
    sucursales_id:'',
    id_producto:''
  }

  productos = {
    id1:'',
    cantidad1:''
  }
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public viewCtrl: ViewController,
     private alertController:AlertController,
     private loadingController:LoadingController, 
     public HomeProvider:HomeProvider,
     public PagarProvider:PagarProvider) {
    console.log("id_producto",this.id_producto = navParams.get("id_producto"));
    this.getProductoAComprar(this.id_producto);
    
    this.fechasinprocesar= new Date();
    this.contador=1;
console.log(this.fechaprocesada = this.fechasinprocesar.getDate() + "-" + (this.fechasinprocesar.getMonth() +1) + "-" + this.fechasinprocesar.getFullYear());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraenlineaPage');
  }

  presentModal() {
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.factura= {
      total:this.valor_actual,
      id_empleado:localStorage["id_empleado"],
      venta_web:'1',
      length:'1',
      cantidad_cuota:'1',
      descripcion_ped:"",
      tiempo_espera:this.fechaprocesada,
      sucursales_id:"0",
      id_producto:this.id_producto
    }
    this.productos = {
      id1:this.id_producto,
      cantidad1:'1'
    }
    console.log(this.factura);
    console.log(this.productos);
 this.PagarProvider.factura(this.factura,this.productos)
    .then(data => {
      this.datos = data;
      
      console.log("datos dela factura creada",this.datos);
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

    



    let profileModal = this.modalCtrl.create(CompraexitosaPage,{
      datos:array,
      contador:this.contador,
      valor_actual:this.valor_actual
    });
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
      
    });
    this.loader.dismiss();
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
    this.loader = this.loadingController.create({
      content: "Please wait...",
     
    });
    this.loader.present();
    this.HomeProvider.getProductoAComprar(id)
    .then(data => {
      this.datos = data;
     array = this.datos.data;
     console.log("cantidad",array = array['0']);
     cantidad_venta = array.cantidad_venta_user;
     this.valor_actual = array.valor;
     this.valor = array.valor;
      console.log("datos",this.datos);
      console.log("valor",this.valor);
      console.log("cantidad venta user",cantidad_venta);
      this.loader.dismiss();
    },err=>{
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
  cerrar(){
    this.viewCtrl.dismiss();
  }

  menos(){
    if(this.contador >= 2){
     
      this.contador = this.contador - 1;
      
      this.valor_actual = parseInt(this.valor_actual) - parseInt(this.valor)   ;
    }
    
  }
  mas(){
    if(this.contador < cantidad_venta){
      this.contador = this.contador + 1 ;
      this.valor_actual = parseInt(this.valor_actual) + parseInt(this.valor)   ;
    }
  }

}
