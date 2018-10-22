import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { CameraPreviewService} from '../../providers/cameraPreview.service';
import { App } from 'ionic-angular';
import { PreviewPage } from '../preview/preview';
// import { Alipay } from '@ionic-native/alipay';
import { AlertController } from 'ionic-angular';

declare var  cordova:any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
    // private cameraPreview: CameraPreviewService,
    private app: App,
    // private alipay: Alipay,
    private promptAlert:AlertController) {

  }
  cameraStart() {
    this.app.getRootNav().push(PreviewPage);
    // this.cameraPreview.startCamera().then(data=>{
    //   console.log(data)
    // }).catch(err=>{
    //   console.log(err)
    // });
  }
  browserOpen() {
    const prompt = this.promptAlert.create({
      title: '提示',
      message: "输入打开方式和地址",
      inputs: [
          {
              name: 'way',
              placeholder: '打开方式'
          },
          {
            name: 'url',
            placeholder: '打开地址'
        }
      ],
      buttons: [
          {
              text: '取消',
              handler: data => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: '保存',
              handler: data => {
                var ref = window.open(data['url'], data['way'], 'location=yes');
                ref.addEventListener('loadstart', function (event: any) { alert(event.url); });
              }
          }
      ]
  });
  prompt.present(); 
  }
  Alipay() {
    //alipayOrder is a string that has been generated and signed by the server side.
    // console.log(this.alipay)
    // let alipayOrder='2018072421001004910578660565'
    // this.alipay.payment(alipayOrder)
    //   .then(result => {
    //     console.log(result); // Success
    //   })
    //   .catch(error => {
    //     console.log(error); // Failed
    //   });
      
  }
  CordovaPay(){
    
    // let alipayOrder='2018072421001004910578660565'  
    // let alipayOrder= "app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D";  
    let authInfo='apiname=com.alipay.account.auth&app_id=2018062660475092&app_name=mc&auth_type=AUTHACCOUNT&biz_type=openservice&method=alipay.open.auth.sdk.code.get&pid=2088131533593230&product_id=APP_FAST_LOGIN&scope=kuaijie&sign_type=RSA&target_id=1532507117357&sign=AXKe%2Btm2LoLaQ7n7UiH6RxN7A%2BKZWuENrJwjZnpS1nFGzypoollKqo6SP59ecImRFEqPfDRk1rnX7Sxy7ibnfckuHtLY8X8c8sfZKx%2FVW7vkfMftAq6F18mP9luaignkQBPm%2Fc2nNktAMGbmQ79ZqtVAh2se0A%2FVzM06DJJwkIatUe9PjxpbEwmfT1XqcIhAvR99vNIhTpmbHAjSdMYDJNbqyUn58bgb46wirFfD%2FyzZY91wMXq5IIkPkKW%2FjEj1r4YvU5ViC%2FL7ayD%2Bj5Uie385xvtY7NSmXcvFXQJ%2Bv9E1iXQCYi4zqr6wrMkpW06we1U%2Fg4212m2GBU7vPtY6Dw%3D%3D'
    console.log(cordova)
    console.log(cordova.plugins)
    // console.log(cordova.plugins.Alipay)
    cordova.plugins.alipay.payment(authInfo,function success(e){
      console.log('ff')
        console.log(e)
      },function error(e){
      console.log('dd')
        
        console.log(e.memo)
        console.log(JSON.stringify(e))
      });
  }
}
