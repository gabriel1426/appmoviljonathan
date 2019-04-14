import { PerfilProvider } from './../../providers/perfil/perfil';
import { Component , ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms'
import { IonicPage, NavController, NavParams, LoadingController, AlertController,ToastController  } from 'ionic-angular';
/**
 * Generated class for the EditarperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var datos;
var user;
var emp;
@IonicPage()
@Component({
  selector: 'page-editarperfil',
  templateUrl: 'editarperfil.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EditarperfilPage {
public letras:any;
  public nombre : any;
  public email : any;
  public cedula: any;
  public celular: any;
  public direccion : any;
  public ciudad_empleado : any;
  public monto : any;
  public id_empresa: any;
  public id_usuario : any;
  public id_empleado : any;
  public fecha_nacimiento : any;
  public sexo : any;
  public bloqueo : any;

  ActProfileForm:FormGroup;
  request = {
     nombre : '',
     email : '',
     cedula: '',
     celular: '',
     direccion :'',
     fecha_nacimiento : '',
     _method:'put',
     id_empleado:'',
     id_usuario:''

  }

 loader;
datos:any=[];
  constructor(
    
    public cdRef:ChangeDetectorRef,
    public formBuilder:FormBuilder,
    private alertController:AlertController,
    public navCtrl: NavController,
    private loadingController:LoadingController, 
    private toastCtrl: ToastController, 
    public navParams: NavParams, 
    public PerfilProvider: PerfilProvider) {

      this.ActProfileForm = formBuilder.group({
        Nombre:['',Validators.compose([Validators.maxLength(45),Validators.required])],
        Email:['',Validators.compose([Validators.required])],
        Cedula:['',Validators.compose([Validators.required])],
        Celular:['',Validators.compose([Validators.required])],
        Direccion:['',Validators.compose([Validators.required])],
        Ciudad:['',Validators.compose([Validators.required])],
        Fecha_nacimiento:['',Validators.compose([Validators.required])],
        Id_empleado:['',Validators.compose([Validators.required])],
        Id_usaurio:['',Validators.compose([Validators.required])],
      });
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarperfilPage');
  }
  ngAfterViewInit() {

    this.cdRef.detectChanges();
     }
     
     ngOnInit() {
      this.loader = this.loadingController.create({
        content: "Please wait...",
      });
      this.loader.present();
      console.log(this.id_empleado = localStorage["id_empleado"]);
      
      this.nombre =localStorage["nombre"];
      this.email =localStorage["email"];
      this.cedula =localStorage["cedula"];
      this.celular =localStorage["celular"];
      this.direccion =localStorage["direccion"];
      this.ciudad_empleado =localStorage["ciudad_empleado"];
      this.monto =localStorage["monto"];
      this.id_empresa =localStorage["id_empresa"];
      this.id_usuario =localStorage["id_usuario"];
      this.id_empleado =localStorage["id_empleado"];
      this.fecha_nacimiento =localStorage["fecha_nacimiento"];
      this.sexo =localStorage["sexo"];
      this.bloqueo =localStorage["bloqueo"];
      console.log('ngoninit');  
      
      var palabras = this.nombre,
      resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
    
      console.log(resultado.replace(/\s/g, ''));
      if(resultado.length <= 2){
        this.letras = resultado;
      }else{
        this.letras = resultado.substr(0, 3);
      }
      this.loader.dismiss();
    }

    

 

  Actualizar(){
    this.loader = this.loadingController.create({
      content: "Please wait...",
    });
    this.loader.present();
    console.log("request",this.request);
    this.PerfilProvider.ActUser(this.request)
    .then(data => {

      datos = data;
     console.log("empleado cedula",user = datos.data.empleado.cedula) 
      localStorage.setItem("nombre",datos.data.user.nombre);
      localStorage.setItem("email",datos.data.user.email);
      localStorage.setItem("cedula",datos.data.empleado.cedula);
      localStorage.setItem("celular",datos.data.empleado.celular);
      localStorage.setItem("direccion",datos.data.user.direccion);
      localStorage.setItem("fecha_nacimiento",datos.data.empleado.fecha_nacimiento);
      // localStorage.setItem("monto",datos.data.empleado.cedula);
     
      var palabras = localStorage["nombre"],
      resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
    
      console.log(resultado.replace(/\s/g, ''));
      if(resultado.length <= 2){
        this.letras = resultado;
      }else{
        this.letras = resultado.substr(0, 3);
      }
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
