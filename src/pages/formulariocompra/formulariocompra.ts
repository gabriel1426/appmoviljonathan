import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { PagarProvider } from '../../providers/pagar/pagar';

/**
 * Generated class for the FormulariocompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var nombre_formulario;
var datos;
@IonicPage()
@Component({
  selector: 'page-formulariocompra',
  templateUrl: 'formulariocompra.html',
})
export class FormulariocompraPage {
  loader: any;
  codigo: number;
  datos: {};
  id_sucursal: any;
  nombre_formulario;

  constructor(public PagarProvider:PagarProvider,
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.id_sucursal = 3;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormulariocompraPage');
  }

  ngOnInit(){
    this.formulario();
  }

  formulario(){
  
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    console.log("Codigo + Email",this.codigo,localStorage["email"]);
    this.PagarProvider.formulario(this.id_sucursal)
    .then(data => {

      datos = data;
      this.nombre_formulario = datos.formulario_nombre;
      this.datos = datos.data;
      // this.datos = data;
      console.log("preguntas formulario",this.datos);
      console.log("nombre formulario",this.nombre_formulario);
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


  enviar(){
    
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    console.log("Codigo + Email",this.codigo,localStorage["email"]);
    this.PagarProvider.formulario(this.id_sucursal)
    .then(data => {

      datos = data;
      this.nombre_formulario = datos.formulario_nombre;
      this.datos = datos.data;
      // this.datos = data;
      console.log("preguntas formulario",this.datos);
      console.log("nombre formulario",this.nombre_formulario);
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
