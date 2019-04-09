import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditarperfilPage } from '../editarperfil/editarperfil';
import { RecargaPage } from '../recarga/recarga';
import { HistorialPage } from '../historial/historial';





/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
nombre;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre = localStorage["nombre"]
  }

  editarPerfil(){
    this.navCtrl.push(EditarperfilPage);
  }

  historial(){
    this.navCtrl.push(HistorialPage);
  }

  recarga(){
    this.navCtrl.push(RecargaPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
