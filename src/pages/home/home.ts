import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController,AlertController,LoadingController } from 'ionic-angular';
import { PromocionesPage } from '../promociones/promociones';
import { ModaldeportePage } from '../modaldeporte/modaldeporte';
import { HomeProvider } from '../../providers/home/home';
import { TerminosycondicionesPage } from './../terminosycondiciones/terminosycondiciones';
import { PromocionesdetallePage } from '../promocionesdetalle/promocionesdetalle';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 id_promociones;
  datos:any= [];
nombre;
monto;
loader;
empresa;
tarjeta;
tarjeta_mostrar;
cedula;
img_tarjeta_data;
tarjeta_completa;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public navCtrl: NavController,
    public modalCtrl: ModalController,
     public HomeProvider:HomeProvider) {
  
    this.nombre = localStorage["nombre"];
    // this.monto = localStorage["monto"];
    this.empresa = localStorage["empresa"];
this.m_tarjeta(); 
this.img_tarjeta();
  }

  m_tarjeta(){
    this.tarjeta = localStorage["cod_empresa"] + ''+ localStorage["cedula"] ;
    console.log("tamaño de la tarjeta", this.tarjeta.length);
    if(this.tarjeta.length >= 16){
      this.cedula = localStorage["cedula"];
      console.log("tamaño dela cedula",this.cedula.length)

      this.tarjeta_mostrar =  this.tarjeta.slice(0, 4) + " " + this.tarjeta.slice(4,8)+ " " + this.tarjeta.slice(8,12)+ " " + this.tarjeta.slice(12,16)+ " " + this.tarjeta.slice(16,20);
      // this.tarjeta = this.pad(this.tarjeta, 20, ' '); 
    }else{
      // this.tarjeta_completa = this.tarjeta
      this.tarjeta = this.pad(this.tarjeta, 16, 0); 
      console.log("tarjeta del else" ,this.tarjeta );
      this.tarjeta_mostrar =  this.tarjeta.slice(0, 4) + " " + this.tarjeta.slice(4,8)+ " " + this.tarjeta.slice(8,12)+ " " + this.tarjeta.slice(12,16);
    }

  }

  img_tarjeta(){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.HomeProvider.img_tarjeta(localStorage["id_empresa"])
    .then(data => {
      this.img_tarjeta_data = data;
      this.img_tarjeta_data =  this.img_tarjeta_data.data;
      this.loader.dismiss();
      console.log(this.img_tarjeta_data);
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
  

  pad(input, length, padding) { 

    var str = input + "";
    return (length <= str.length) ? str : this.pad(str+padding, length, padding);
  }

  ngOnInit(){
    this.getPromociones();
    this.getMonto();
  }
  getPromociones() {
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.HomeProvider.getCategorias()
    .then(data => {
      this.datos = data;
      this.loader.dismiss();
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

  verpromociones(){
   
    this.navCtrl.push(PromocionesPage,{
      id:1
    });
  }

  presentModal(id) {
    console.log('id_promocion',id)
    let profileModal = this.modalCtrl.create(ModaldeportePage,{
      id_promociones:id
    });
    profileModal.present();
  }
  presentModal2(id) {
    console.log('id_establecimiento',id)
    let profileModal = this.modalCtrl.create(TerminosycondicionesPage,{
      id_establecimiento:id
    });
    profileModal.present();
  }
  detallepromociones(id){
    console.log("id de la promocion",id)
    this.navCtrl.push(PromocionesdetallePage,{
      id_promocion:id
    });
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter()");
    this.getMonto();
  }
  
  getMonto(){

    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.HomeProvider.getMonto(localStorage["id_empleado"])
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
  
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    
    console.log('Begin async operation', refresher);
    //ur function e.g getPostWordPress()
    this.getPromociones();
    this.getMonto();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);}
    
}
