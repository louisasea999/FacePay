import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
// import { wyHttpService } from '../../config/http.service'
// import { UserService } from '../../config/user.service'
import { CameraPreviewService } from '../../providers/cameraPreview.service';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'page-preview',
    templateUrl: 'preview.html'
})
export class PreviewPage {

    constructor(public navCtrl: NavController,
        // private http: wyHttpService,
        // private userservice: UserService,
        // private promptAlert: AlertController,
        private statusBar: StatusBar,
        private cameraPreview: CameraPreviewService,
        public element: ElementRef) {
    }
    showStream: boolean = true;
    // base64:string=null;
    base64:string='./assets/imgs/iu.jpeg';
    zoom:number=0;
    ngOnInit() {
        // setTimeout(this.getH5Cameral(), 0)
        console.log('statusBar')
        // console.log(document.documentElement.clientWidth)
        // console.log(document.body.clientWidth)
        // console.log(document.body.offsetWidth)
        // console.log(window.screen.width)
        // console.log(window.screen.height)
        // let view={}
        let dom=this.element.nativeElement.querySelector('.wyy_camera')
        console.log(dom.clientWidth)
        console.log(dom.offsetWidth)
        console.log(dom.clientHeight)
        console.log(dom.style)
        this.statusBar.hide();
        this.cameraPreview.startCamera({}).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        });

    }
    backToMine(e) {
        this.navCtrl.pop()
    }
    takePicture() {
        console.log('takePic')
        this.cameraPreview.getSupportedPictureSizes().then(data=>{
            console.log(data)
            data.forEach(dimension => {
                console.log(dimension.width + 'x' + dimension.height);
            });
        })
        let _self=this;
        this.cameraPreview.takePicture().then(data=>{
            // console.log(data[0])
            _self.base64=`data:image/jpeg;base64,${data[0]}`;
            // console.log(_self.base64)
            let img=new Image()
            img.src=_self.base64;
            console.log('imgwidth',img.width)
            console.log(img.height)
        },err=>{
            console.log(err)
        })
    }
    setZoom(){
        let _self=this;
        this.zoom=this.zoom==2?0:this.zoom;
        console.log(this.zoom)
        this.cameraPreview.setZoom(this.zoom).then(data=>{
            console.log(data)
            _self.zoom++;
        },err=>{
            console.log(err)
        });
    }
    ionViewWillLeave() {
        console.log('willleave')
        this.cameraPreview.StopCameraPreview();
    }

}
