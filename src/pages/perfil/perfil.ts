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
letras
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nombre = localStorage["nombre"]

    var palabras = this.nombre,
    resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
  
    console.log(resultado.replace(/\s/g, ''));
    if(resultado.length <= 2){
      this.letras = resultado;
    }else{
      this.letras = resultado.substr(0, 3);
    }
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
