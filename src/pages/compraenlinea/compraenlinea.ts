import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { CompraexitosaPage } from '../compraexitosa/compraexitosa';
import { PinPage } from '../pin/pin';
import { TerminosycondicionesPage } from '../terminosycondiciones/terminosycondiciones';
import { PagarProvider } from '../../providers/pagar/pagar';
import { HomeProvider } from '../../providers/home/home';
import swal from 'sweetalert';
import swalOptions from 'sweetalert';

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
  id_sucursal;
  fechasinprocesar;
  fechaprocesada;
  datos:any=[];
  monto:any=[];
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
    id_producto:'',
    id1:'',
    cantidad1:'',
  }
  codigo;
  productos = {
    id1:'',
    cantidad1:''
  }
  terminos_condiciones:boolean=false;
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
ngOnInit(){
  console.log("id_empleado",localStorage["id_empleado"]);
  this.getMonto(localStorage["id_empleado"]);
}

/// consultar monto actual
getMonto(id){
  console.log("factura total" ,this.valor_actual);
  console.log("monto " ,this.monto);
  this.loader = this.loadingController.create({
    content: "Espera por favor...",
  });
  this.loader.present();
  this.HomeProvider.getMonto(id)
  .then(data => {
    this.monto = data;
    this.monto = this.monto.data;
    this.loader.dismiss();
console.log("monto  data",this.monto);
  },err=>{
    let alert1 = this.alertController.create({
      title: 'Error!',
      subTitle: 'No pudo conectar con el servidor!',
    buttons: ['OK']
    });
    alert1.present();
    this.loader.dismiss();
  })

 
}

///metodo de compra
  presentModal() {
    

    if(this.terminos_condiciones == false){
      let alert1 = this.alertController.create({
        title: 'Oops!',
        subTitle: 'Debe aceptar terminos y condiciones!',
      buttons: ['OK']
      });
      alert1.present();
      return;
    }

    if(parseInt(this.monto) < parseInt(this.valor_actual)){
      console.log("cantidad",this.contador);
    console.log("valor_actual",this.valor_actual)
    console.log("monto",this.monto)
      let alert1 = this.alertController.create({
        title: 'Oops!',
        subTitle: 'Saldo insuficiente!',
      buttons: ['OK']
      });
      alert1.present();
      return
  }else{
    console.log("cantidad",this.contador);
    console.log("valor_actual",this.valor_actual)
    console.log("monto",this.monto)
  }
    
    
   
    this.SweetAlert();
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
      content: "Espera por favor...",
     
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
     this.id_sucursal = array.id_sucursal; 
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


    pagar(){
      this.loader = this.loadingController.create({
        content: "Espera por favor...",
       
      });
      this.loader.present();
      console.log(this.codigo = Math.floor(Math.random()* (9999 - 1000)));
      console.log("Codigo + Email",this.codigo,localStorage["email"]);
    this.PagarProvider.pin(this.codigo,localStorage["email"])
    .then(data => {
      this.datos = data;
      console.log(this.datos);
      this.loader.dismiss();
      let profileModal = this.modalCtrl.create(PinPage,{
        pin:this.codigo,
        factura:this.factura,
        valor_actual:this.valor_actual,
        id_sucursal:this.id_sucursal,
        fechaprocesada:this.fechaprocesada,
        id_producto:this.id_producto,
        cantidad1:this.contador,
        
      });
      profileModal.present().then((resolve)=>{
        this.viewCtrl.dismiss();
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

    SweetAlert(){
      swal({
        title: "Valor a pagar:"+ this.valor_actual,
        icon: "success",
        // button: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.pagar();
        } else {
          
        }
      });


    }
}
