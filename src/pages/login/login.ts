import { UsersProvider } from './../../providers/users/users';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms'
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ToastController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ContrasenaPage } from '../contrasena/contrasena';
import { RegistroPage } from '../registro/registro';






/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 LoginForm:FormGroup;
  credentials = {
    email:'',
    password:''
  }
  userDetails : any;
  responseData: any;

 datos:any=[];
  constructor(
    public formBuilder:FormBuilder,
    private alertController:AlertController,
    public navCtrl: NavController,
    private loadingController:LoadingController, 
    private toastCtrl: ToastController, 
    public usersprovider:UsersProvider)
   {

    this.LoginForm = formBuilder.group({
      Email:['',Validators.compose([Validators.maxLength(45),Validators.required])],
      Password:['',Validators.compose([Validators.required])]
    });
  }

 login(){
   console.log("entro",this.credentials);
  this.usersprovider.login(this.credentials)
  .then(data => {
    this.datos = data;
    console.log("token",localStorage["token"]= this.datos.token);
    console.log("user",localStorage["User"] = this.datos.user);
    // localStorage.setItem("datos_user",this.datos);
    // const User = JSON.parse(localStorage.getItem('datos'));
    
    // console.log("user datos",JSON.stringify(localStorage.getItem("datos_user")));
    this.navCtrl.setRoot(TabsPage);
  })

 }



  public recuperarContrasena(){
    this.navCtrl.push(ContrasenaPage);

  }

  

  public registrar(){

    this.navCtrl.push(RegistroPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  
}
