import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController} from 'ionic-angular';
import { PerfilProvider } from './../../providers/perfil/perfil';
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
datosdia;
datossemana;
datosmes;
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController,
     public navParams: NavParams,
     public PerfilProvider:PerfilProvider
     ) {
       this.getHistorial(localStorage["id_empleado"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  getHistorial(id){
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.PerfilProvider.getHistorial(id)
    .then(data => {
      this.datosdia = data;
      this.datosdia = this.datosdia.dia;
      this.datossemana = data;
      this.datossemana = this.datossemana.semana;
      this.datosmes = data;
      this.datosmes = this.datosmes.mes;
      this.loader.dismiss();
     console.log("Historial",this.datosdia);
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
