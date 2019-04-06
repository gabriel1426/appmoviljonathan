import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { ModalcomercioPage } from '../modalcomercio/modalcomercio';
import { CategoriasProvider } from '../../providers/categorias/categorias';




/**
 * Generated class for the ComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comercio',
  templateUrl: 'comercio.html',
})
export class ComercioPage {
id_categoria;
datos:any=[];
  constructor(public CategoriasProvider:CategoriasProvider,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    console.log("id_categoria",this.id_categoria = navParams.get("id_categoria"));
    this.getEstablecimientos(this.id_categoria)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComercioPage');
  }


  getEstablecimientos(id) {
    this.CategoriasProvider.getEstablecimientoCategoria(id)
    .then(data => {
      this.datos = data;
     
      console.log(this.datos);
    })
  }

  presentModal(id) {
    let profileModal = this.modalCtrl.create(ModalcomercioPage,{
        id_establecimiento:id
    });
    profileModal.present();
  }

  verpromociones(){
    
  }
 
}
