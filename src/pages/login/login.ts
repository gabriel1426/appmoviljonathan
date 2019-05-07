import { ActualizardatosPage } from './../actualizardatos/actualizardatos';
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
    content: "Espera por favor...",
   
  });
  loader.present();
   console.log("entro",this.credentials);
  this.usersprovider.login(this.credentials)
  .then(data => {
    datos = data;
    user = datos.user[0];
    console.log("token",localStorage["token"]= datos.token);
    console.log("token",localStorage["empresa"]= datos.empresa);
    console.log("token",localStorage["cod_empresa"]= datos.cod_empresa);
    if( user.nombre != null){
      console.log("nombre",localStorage["nombre"] = user.nombre);
    }
    if(user.email != null)console.log("email",localStorage["email"] = user.email);
    if(user.email != null)console.log("direccion",localStorage["direccion"] = user.direccion);

    if(user.cedula != null)console.log("cedula",localStorage["cedula"] = user.cedula);
    // if(user.monto != null){console.log("monto",localStorage["monto"] = user.monto);}else{localStorage["monto"] = 0;}
    if(user.id_usuario != null)console.log("id_usuario",localStorage["id_usuario"] = user.id_usuario);
    if(user.id_empresa != null)console.log("id_empresa",localStorage["id_empresa"] = user.id_empresa);
    if(user.id != null)console.log("id_empleado",localStorage["id_empleado"] = user.id);
    if(user.celular != null)console.log("celular",localStorage["celular"] = user.celular);
    if(user.fecha_nacimiento != null)console.log("fecha_nacimiento",localStorage["fecha_nacimiento"] = user.fecha_nacimiento);
    if(user.sexo != null)console.log("sexo",localStorage["sexo"] = user.sexo);
    if(user.ciudad != null)console.log("ciudad_empleado",localStorage["ciudad_empleado"] = datos.ciudad);
    if(user.bloqueo != null)console.log("bloqueo",localStorage["bloqueo"] = user.bloqueo);
if(user.actualizado != 0){
  this.navCtrl.setRoot(TabsPage);
}else{
  this.navCtrl.setRoot(ActualizardatosPage);
}
   
    loader.dismiss();
  },err => {
    console.log("error",err)
    loader.dismiss();
    if(err.status === 401){
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'El usuario está bloqueado!',
      buttons: ['OK']
      });
      alert1.present();
    }else{
      let alert1 = this.alertController.create({
        title: 'Error!',
        subTitle: 'El usuario o la contraseña son incorrectas!',
      buttons: ['OK']
      });
      alert1.present();
    }
    
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
