import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { JPush } from 'ionic-native';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { MinePage } from '../pages/mine/mine';
import { RegisterPage } from '../pages/register/register';
import { OrderPage } from '../pages/orders/order';
import { TabsPage } from '../pages/tabs/tabs';
import { PreviewPage } from '../pages/preview/preview';
import { JPush } from '@jiguang-ionic/jpush';


import { HttpClientModule } from '@angular/common/http'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera'

import { wyHttpService } from '../config/http.service'
import { UserService } from '../config/user.service'
import { CameraPreview } from '@ionic-native/camera-preview';

import { CameraPreviewService } from '../providers/cameraPreview.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MinePage,
    RegisterPage,
    OrderPage,
    TabsPage,
    PreviewPage  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MinePage,
    RegisterPage,
    OrderPage,
    TabsPage,
    PreviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CameraPreviewService,
    CameraPreview,
    wyHttpService,
    UserService,
    JPush,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
