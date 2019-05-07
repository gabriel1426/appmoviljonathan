import { HomeProvider } from './../../providers/home/home';
import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { PerfilProvider } from './../../providers/perfil/perfil';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ToastController  } from 'ionic-angular';

/**
 * Generated class for the RecargaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recarga',
  templateUrl: 'recarga.html',
})
export class RecargaPage {

  RecargaForm:FormGroup;
  request = {
     descripcion : '',
     valor_solicitado : '',
     id_empresa: '',
     id_empleado: '',
     valor_actual_monto: '',


  }
id_empresa;
id_empleado;
monto;
  datos;
  loader;
  constructor( 
    public HomeProvider:HomeProvider,
    private loadingController:LoadingController, 
     private alertController:AlertController,
    public PerfilProvider: PerfilProvider,
     public formBuilder:FormBuilder,
     public navCtrl: NavController,
      public navParams: NavParams,
     ) {

    this.RecargaForm = formBuilder.group({
      Descripcion:['',Validators.compose([Validators.maxLength(45),Validators.required])],
      Valor_solicitado:['',Validators.compose([Validators.required])],
      Id_empresa:['',Validators.compose([Validators.required])],
      Id_empleado:['',Validators.compose([Validators.required])],
      Valor_actual_monto:['',Validators.compose([Validators.required])],
     
    });

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecargaPage');
  }
  ngOnInit() {
    this.id_empresa =localStorage["id_empresa"];
    this.id_empleado =localStorage["id_empleado"]
    
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

  recarga(){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    console.log("request",this.request);
    this.PerfilProvider.Recarga(this.request)
    .then(data => {

      this.datos = data;
      let alert1 = this.alertController.create({
        title: 'Petición Enviada!',
        subTitle: 'Su petición ha sido enviado satisfactoriamente!',
      buttons: ['OK']
      });
      alert1.present();
      this.RecargaForm.reset();
      console.log(this.datos);
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
