import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CotegoriasPage } from '../pages/cotegorias/cotegorias';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { PagarPage } from '../pages/pagar/pagar';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { ContrasenaPage } from '../pages/contrasena/contrasena';
import { TabsPage } from '../pages/tabs/tabs';
import { PromocionesPage } from '../pages/promociones/promociones';
import { PinPage } from '../pages/pin/pin';
import { RecargaPage } from '../pages/recarga/recarga';
import { HistorialPage } from '../pages/historial/historial';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { EditarperfilPage } from '../pages/editarperfil/editarperfil';
import { ComercioPage } from '../pages/comercio/comercio';
import { ModalcomercioPage } from '../pages/modalcomercio/modalcomercio';
import { CompraenlineaPage } from '../pages/compraenlinea/compraenlinea';
import { CompraexitosaPage } from '../pages/compraexitosa/compraexitosa';
import { ValorapagarPage } from '../pages/valorapagar/valorapagar';
import { ComfirmaciondepagoPage } from '../pages/comfirmaciondepago/comfirmaciondepago';
import { ModaldeportePage } from '../pages/modaldeporte/modaldeporte';
import { TerminosycondicionesPage } from '../pages/terminosycondiciones/terminosycondiciones';
import { ScanerPage } from '../pages/scaner/scaner';
import { ProductoPage } from '../pages/producto/producto';




// Providers
import { UsersProvider } from '../providers/users/users';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { PagarProvider } from '../providers/pagar/pagar';
import { PerfilProvider } from '../providers/perfil/perfil';
import { HomeProvider } from '../providers/home/home';


// plugin
import { OneSignal } from '@ionic-native/onesignal';
// import { QRScanner } from '@ionic-native/qr-scanner';
import { IonTextAvatar } from 'ionic-text-avatar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@NgModule({
  declarations:[
    MyApp,
    HomePage,
    CotegoriasPage,
    FavoritosPage,
    PagarPage,
    LoginPage,
    RegistroPage,
    ContrasenaPage,
    PerfilPage,
    TabsPage,
    PromocionesPage,
    EditarperfilPage,
    PinPage,
    RecargaPage,
    HistorialPage,
    ComercioPage,
    ModalcomercioPage,
    CompraenlineaPage,
    CompraexitosaPage,
    ValorapagarPage,
    ComfirmaciondepagoPage,
    ModaldeportePage,
    TerminosycondicionesPage,
    ScanerPage,
    ProductoPage,
    IonTextAvatar,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CotegoriasPage,
    FavoritosPage,
    PagarPage,
    PerfilPage,
    LoginPage,
    RegistroPage,
    ContrasenaPage,
    TabsPage,
    PromocionesPage,
    EditarperfilPage,
    PinPage,
    RecargaPage,
    HistorialPage,
    ComercioPage,
    ModalcomercioPage,
    CompraenlineaPage,
    CompraexitosaPage,
    ValorapagarPage,
    ComfirmaciondepagoPage,
    ModaldeportePage,
    TerminosycondicionesPage,
    ScanerPage,
    ProductoPage
  ],
  providers:[
    StatusBar,
    SplashScreen,
    Geolocation,

    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    CategoriasProvider,
    PagarProvider,
    PerfilProvider,
    HomeProvider,
    BarcodeScanner,
    
    
  ]
})
export class AppModule {}
