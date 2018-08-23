import { Component, ViewChild} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { JPush } from '@jiguang-ionic/jpush';
import { NavController } from 'ionic-angular';
import { PayPage } from '../pages/pay/pay';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  // @ViewChild('myTabs') tabRef: TabsPage;
  @ViewChild('myNav') navCtrl: NavController
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, JPush: JPush) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      JPush.init().then(res => { console.log(res) });  // 初始化
      document.addEventListener("jpush.openNotification", (event?: any) => {
        console.log("===============打开推送内容===============")
        console.log(event)
        // alert(event.alert)
        console.log(event.extras.tradeNum)
        this.navCtrl.push(PayPage,{'tradeNumber':event.extras.tradeNum})
      }, false);
        // this.navCtrl.push(PayPage,{'tradeNumber':123})
      
    });
  }
  ionViewDidEnter() {
    console.log('dd')
  }

}
