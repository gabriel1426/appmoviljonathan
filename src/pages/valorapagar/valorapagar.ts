import { PagarProvider } from './../../providers/pagar/pagar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,AlertController,LoadingController} from 'ionic-angular';
import { PinPage } from '../pin/pin';



/**
 * Generated class for the ValorapagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valorapagar',
  templateUrl: 'valorapagar.html',
})
export class ValorapagarPage {
qr;
datos:any=[];
loader;
  constructor(
    private alertController:AlertController,
    private loadingController:LoadingController, 
    public PagarProvider:PagarProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
    console.log("qr",this.qr = navParams.get("qr"));
    this.buscarqr(this.qr);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValorapagarPage');
  }

  confirmarpago(){
    
    let profileModal = this.modalCtrl.create(PinPage);
    profileModal.present().then((resolve)=>{
      this.viewCtrl.dismiss();
    });
  }

  buscarqr(qr){
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    console.log("qr",qr);
    this.PagarProvider.buscarqr(qr)
    .then(data => {

      this.datos = data;
     
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

}
