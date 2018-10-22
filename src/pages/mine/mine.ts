import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { OrderPage } from '../orders/order';
import { App } from 'ionic-angular';

import { UserService } from '../../config/user.service'
import { wyHttpService } from '../../config/http.service'
import { Wechat } from '@ionic-native/wechat';
@Component({
    selector:'page-mine',
    templateUrl:'mine.html'
})
export class MinePage{
    isLogin:boolean;
    constructor(public navCtrl:NavController,
    private userservice:UserService,
    private http: wyHttpService,
    private app:App,
    private wechat: Wechat
    ){
        

    }
    ngOnInit(){
        
    }
    ionViewWillEnter(){
        console.log('willEnter1')
        this.isLogin=this.userservice.isLogin();
        console.log(this.userservice.userInfo)
    }
    registerLoginTap(e){
        console.log('tappped')
        console.log(this.navCtrl)
        // this.navCtrl.push(RegisterPage,{
        //     // isLogin:this.isLogin
        // })
        this.app.getRootNav().push(RegisterPage)
    }
    goToMyOrderPage(e){
        console.log('dd')
        this.navCtrl.push(OrderPage) 
    }
    logout(){
        this.userservice.logout();
        this.isLogin=false;
    }
    removeFace() {
        let _self=this;
        if(!this.userservice.userInfo.face_token){ return}
        return this.http.removeAllFaces(this.userservice.userInfo.face_token).then(data => {
            console.log(data);
            _self.userservice.logout();
            _self.isLogin=false;
        }).catch(err => {
            console.log(err)
        })
    }
    weChat(){
        this.http.wechatUnifiedOrder();
    }
    wechatAuth(){
        this.wechat.auth("snsapi_userinfo","wechat_sdk_demo").then(data=>{
            console.log(data)
        }).catch(error=>{
            console.log(error)
        })
    }
    wechatPay(){
        let params={
            appid:'wx5055b021a210708c',
            package:'Sign=WXPay',
            partnerid:'1469962302',
            prepayid:'',            
            nonce_str:'1add1a30ac87aa2db72f57a2375d8fec',
            timestamp:new Date().getTime(),
            sign:''

        }
        this.wechat.sendPaymentRequest('kk')
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
    }
}