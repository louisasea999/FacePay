import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
// import { AlertController } from 'ionic-angular';

// import { MinePage } from '../mine/mine'
// import { Camera, CameraOptions } from '@ionic-native/camera'

// import { wyHttpService } from '../../config/http.service'
// import { UserService } from '../../config/user.service'


@Component({
    selector: 'page-order',
    templateUrl: 'order.html'
})
export class OrderPage {
    constructor(public navCtrl: NavController,
        // private camera: Camera,
        // private http: wyHttpService,
        // private userservice: UserService,
        // private promptAlert: AlertController
    ) {
    }
   
    ngOnInit() {
       
    }
    backToMine(e) {    
        this.navCtrl.pop()
    }
    goPay(){
        window.location.href='alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=http%3A%2F%2F172.20.10.11%3A8080%2FAlipay%2Findex.html%3FtradeNo%3D2018072421001004910578660565'
    }
    ngOnDestroy() {
        console.log('des')
    }
}