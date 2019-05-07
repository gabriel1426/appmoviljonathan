  
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { ScanerPage } from '../scaner/scaner';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ValorapagarPage } from '../valorapagar/valorapagar';
import { PagarProvider } from './../../providers/pagar/pagar';
/**
 * Generated class for the PagarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagar',
  templateUrl: 'pagar.html',
})
export class PagarPage {
  scannedData:any={};
  encodText:string='';
  encodedData:any={};
  datos;
  productFound:boolean = false;
  constructor(private alertController:AlertController,
    public PagarProvider:PagarProvider,
    private scanner: BarcodeScanner,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagarPage');
    
  }

  pagar(){
    this.navCtrl.push(ScanerPage);
  }

  scan2() {

    this.scanner.scan().then((barcodeData) => {
      
      this.encodedData = barcodeData;
      this.PagarProvider.buscarqr(this.encodedData.text)
      .then(data => {
        this.datos = data;
        if(this.datos === 1){
          console.log(this.datos);
          this.navCtrl.push(ValorapagarPage,{
            qr:this.encodedData.text
          });
        }else{
          let alert1 = this.alertController.create({
            title: 'Error!',
            subTitle: 'No pudo encontrar el QR2!',
          buttons: ['OK']
          });
          alert1.present();
        }
      
      },err=>{
        let alert1 = this.alertController.create({
          title: 'Error!',
          subTitle: 'No pudo encontrar el QR!1',
        buttons: ['OK']
        });
        alert1.present();
      })
    }, (err) => {
     console.log();
    });
    
   
  
  }

}

