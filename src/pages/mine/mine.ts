import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { OrderPage } from '../orders/order';

import { UserService } from '../../config/user.service'
import { wyHttpService } from '../../config/http.service'

@Component({
    selector:'page-mine',
    templateUrl:'mine.html'
})
export class MinePage{
    isLogin:boolean;
    constructor(public navCtrl:NavController,
    private userservice:UserService,
    private http: wyHttpService,
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
        this.navCtrl.push(RegisterPage,{
            // isLogin:this.isLogin
        })
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
}