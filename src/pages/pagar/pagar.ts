  
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScanerPage } from '../scaner/scaner';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ValorapagarPage } from '../valorapagar/valorapagar';
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
  constructor(private scanner: BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {
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
      this.navCtrl.push(ValorapagarPage,{
        qr:this.encodedData
      });
    }, (err) => {
     console.log();
    });
  }

}

