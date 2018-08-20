import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { OrderPage } from '../orders/order';

import { UserService } from '../../config/user.service'

@Component({
    selector:'page-mine',
    templateUrl:'mine.html'
})
export class MinePage{
    isLogin:boolean;
    constructor(public navCtrl:NavController,
    private userservice:UserService
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
}