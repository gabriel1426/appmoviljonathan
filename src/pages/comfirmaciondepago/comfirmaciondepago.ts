import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,AlertController,LoadingController} from 'ionic-angular';
import { PagarProvider } from '../../providers/pagar/pagar';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ComfirmaciondepagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comfirmaciondepago',
  templateUrl: 'comfirmaciondepago.html',
})
export class ComfirmaciondepagoPage {
datos:any=[];
id_factura;
loader;
  constructor(
    public PagarProvider:PagarProvider,
    public loadingController:LoadingController,
    private alertController:AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      console.log("codigo",this.id_factura = navParams.get("id_factura"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComfirmaciondepagoPage');
  }

  cerrar(){
    this.navCtrl.setRoot(TabsPage);
    this.viewCtrl.dismiss();

  }

  ngOnInit(){
    console.log("ngOnInit()");
    this.factura();
  }
  factura(){
    this.loader = this.loadingController.create({
      content: "Espera por favor...",
    });
    this.loader.present();
    this.PagarProvider.showfactura(this.id_factura)
    .then(data => {
      this.datos = data;
      
      console.log("datos dela factura creada",this.datos);
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
