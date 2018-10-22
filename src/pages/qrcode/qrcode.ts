import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { AlertController } from 'ionic-angular';
// import { Alipay } from '@ionic-native/alipay';
// import { MinePage } from '../mine/mine'
// import { Camera, CameraOptions } from '@ionic-native/camera'
import { StatusBar } from '@ionic-native/status-bar';

import { wyHttpService } from '../../config/http.service'
import { UserService } from '../../config/user.service'
import { Device } from '@ionic-native/device';
import { NavParams } from 'ionic-angular';

// import { JPush } from '@jiguang-ionic/jpush';
import { window } from 'rxjs/operators/window';

// import { window } from 'rxjs/operators/window';


@Component({
    selector: 'page-qrcode',
    templateUrl: 'qrcode.html'
})
export class QRcodePage {
    constructor(public navCtrl: NavController,
        // private camera: Camera,
        private http: wyHttpService,
        private userservice: UserService,
        private promptAlert: AlertController,
        private device: Device,
        private navParams:NavParams,
        private statusBar:StatusBar
    ) {
    }
    src:string='../../assets/imgs/iu.jpeg';
    ngOnInit() {
        // setTimeout(this.getH5Cameral(), 0)
        this.statusBar.hide();
        this.src=`http://qr.liantu.com/api.php?text=${this.navParams['data']['src']}`;
        console.log('iii',this.src);    
    }
    ionViewWillEnter() {
        console.log('register')
    }
   
    ionViewWillLeave() {
        console.log('willleave')
        
    }
    ngOnDestroy() {
        console.log('des')
    }
    backToMine(e) {
        this.navCtrl.pop()
    }
}