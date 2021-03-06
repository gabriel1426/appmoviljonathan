import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,AlertController,LoadingController} from 'ionic-angular';
import { ComfirmaciondepagoPage } from '../comfirmaciondepago/comfirmaciondepago';
import { PagarProvider } from '../../providers/pagar/pagar';
import { HomeProvider } from '../../providers/home/home';
import { CompraexitosaPage } from '../compraexitosa/compraexitosa';
/**
 * Generated class for the PinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var cantidad_venta;
var valor;
var array;
var id_factura;
@IonicPage()
@Component({
  selector: 'page-pin2',
  templateUrl: 'pin2.html',
})
export class Pin2Page {
  profileModal;
datos:any=[];
codigo;
codigo_usuario;
contador=0;
loader;
id_producto;
id_sucursal;
fechasinprocesar;
fechaprocesada;
valor_actual;
valor_cuota;
cantidad1;
valor;
cantidad_cuota;
factura= {
  total:'',
  id_empleado:'',
  venta_web:'',
  length:'',
  cantidad_cuota:'',
  descripcion_ped:" ",
  tiempo_espera:"",
  sucursales_id:'',
  valor_cuota:''
}
  constructor(
    public HomeProvider:HomeProvider,
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public navCtrl: NavController, 
    
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public PagarProvider:PagarProvider) {
    console.log("codigo",this.codigo = navParams.get("pin"));
    console.log("id_sucursal",this.id_sucursal = navParams.get("id_sucursal"));
    console.log("fechaprocesada",this.fechaprocesada = navParams.get("fechaprocesada"));
    console.log("valor_actual",this.valor_actual = navParams.get("valor_actual"));
    console.log("cantidad_cuota",this.cantidad_cuota = navParams.get("cantidad_cuota"));
    // console.log("codigo",this.cantidad1 = navParams.get("cantidad1"));

    // this.getProductoAComprar(this.id_producto);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PinPage');
  }

  confirmar(){
    this.valor_cuota= this.valor_actual/this.cantidad_cuota;
    console.log("valorcuota",this.valor_cuota)
console.log("codigos",this.codigo, "codigo usuario",this.codigo_usuario)
console.log("codigos",this.codigo, "codigo usuario",this.codigo_usuario)
    if(this.contador == 3){
      this.codigo=0;
      this.viewCtrl.dismiss();
    }
    if(this.codigo == this.codigo_usuario){
// aqui empieza el pago
          this.loader = this.loadingController.create({
        content: "Espera por favor...",
      });
      this.loader.present();
      this.factura= {
        total:this.valor_actual,
        id_empleado:localStorage["id_empleado"],
        venta_web:'0',
        length:'1',
        cantidad_cuota:this.cantidad_cuota,
        descripcion_ped:"",
        valor_cuota:this.valor_cuota,
        tiempo_espera:this.fechaprocesada,
        sucursales_id:this.id_sucursal,
      }
      console.log("array factura",this.factura);
      // console.log("array producto",this.productos);
   this.PagarProvider.factura(this.factura)
      .then(data => {
        this.datos = data;
        id_factura  = this.datos;
        id_factura = id_factura.id_factura;
        
        console.log("datos dela factura creada",this.datos);
        console.log("datos dela factura creada iddddd",id_factura);
       
        // this.profileModal = this.modalCtrl.create(ComfirmaciondepagoPage,{
        //   id_factura:id_factura
        // })
        // this.profileModal.present().then((resolve)=>{
        //   this.viewCtrl.dismiss();
        // })
        this.navCtrl.push(ComfirmaciondepagoPage,{
          id_factura:id_factura
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
  
      // let profileModal = this.modalCtrl.create(CompraexitosaPage,{
      //   datos:array,
      //   contador:this.contador,
      //   valor_actual:this.valor_actual
      // });
      // profileModal.present().then((resolve)=>{
      //   this.viewCtrl.dismiss();
        
      // });
      ///// aqui se acaba lo compra en linea 
      
    }else{
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'Codigo Incorrecto!',
      buttons: ['OK']
      });
      alert1.present();
      this.contador++;
    }
    
  }
  cerrar(){

    this.viewCtrl.dismiss();
  }
  // getProductoAComprar(id){
  //   this.loader = this.loadingController.create({
  //     content: "Espera por favor...",
     
  //   });
  //   this.loader.present();
  //   this.HomeProvider.getProductoAComprar(id)
  //   .then(data => {
  //     this.datos = data;
  //    array = this.datos.data;
  //    console.log("cantidad",array = array['0']);
  //    cantidad_venta = array.cantidad_venta_user;
  //    this.valor_actual = array.valor;
  //    this.valor = array.valor;
  //    this.id_sucursal = array.id_sucursal; 
  //     console.log("datos",this.datos);
  //     console.log("valor",this.valor);
  //     console.log("cantidad venta user",cantidad_venta);
  //     this.loader.dismiss();
  //   },err=>{
  //     let alert1 = this.alertController.create({
  //       title: 'Error!',
  //       subTitle: 'No pudo conectar con el servidor!',
  //     buttons: ['OK']
  //     });
  //     alert1.present();
  //     this.loader.dismiss();
  //   })
  //   this.loader.dismiss();

  // }
}
