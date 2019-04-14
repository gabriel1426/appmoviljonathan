import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController , ModalController,AlertController,LoadingController} from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
/**
 * Generated class for the TerminosycondicionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terminosycondiciones',
  templateUrl: 'terminosycondiciones.html',
})
export class TerminosycondicionesPage {
datos;
id_establecimiento;
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController,
    public navCtrl: NavController,  
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public HomeProvider:HomeProvider
    ) {
      console.log("id_establecimiento",this.id_establecimiento = navParams.get("id_establecimiento"));
      this.getTerminoscondiciones(this.id_establecimiento);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TerminosycondicionesPage');
  }
  cerrarmodal(){
    this.viewCtrl.dismiss();
  }

  getTerminoscondiciones(id){
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    this.HomeProvider.getTerminoscondiciones(id)
    .then(data => {
      this.datos = data;
      this.datos = this.datos.data;
 
     
      console.log("datos",this.datos);
   
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
