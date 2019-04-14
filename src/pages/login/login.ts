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
var datos;
var user;
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
    // localStorage.clear();
    this.LoginForm = formBuilder.group({
      Email:['',Validators.compose([Validators.maxLength(45),Validators.required])],
      Password:['',Validators.compose([Validators.required])]
    });
    // localStorage.clear();
  }

 login(){
  const loader = this.loadingController.create({
    content: "Please wait...",
   
  });
  loader.present();
   console.log("entro",this.credentials);
  this.usersprovider.login(this.credentials)
  .then(data => {
    datos = data;
    user = datos.user[0];
    console.log("token",localStorage["token"]= datos.token);
    console.log("nombre",localStorage["nombre"] = user.nombre);
    console.log("email",localStorage["email"] = user.email);
    console.log("direccion",localStorage["direccion"] = user.direccion);
    console.log("cedula",localStorage["cedula"] = user.cedula);
    console.log("monto",localStorage["monto"] = user.monto);
    console.log("id_usuario",localStorage["id_usuario"] = user.id_usuario);
    console.log("id_empresa",localStorage["id_empresa"] = user.id_empresa);
    console.log("id_empleado",localStorage["id_empleado"] = user.id);
    console.log("celular",localStorage["celular"] = user.celular);
    console.log("fecha_nacimiento",localStorage["fecha_nacimiento"] = user.fecha_nacimiento);
    console.log("sexo",localStorage["sexo"] = user.sexo);
    console.log("ciudad_empleado",localStorage["ciudad_empleado"] = datos.ciudad);
    console.log("bloqueo",localStorage["bloqueo"] = user.bloqueo);

    this.navCtrl.setRoot(TabsPage);
    loader.dismiss();
  },err => {
    
    let alert1 = this.alertController.create({
      title: 'Error!',
      subTitle: 'El usuario o la contraseña son incorrectas!',
    buttons: ['OK']
    });
    alert1.present();
  })
  loader.dismiss();
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
