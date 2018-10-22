import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OrderPage } from '../orders/order';
import { NavParams } from 'ionic-angular';

import { wyHttpService } from '../../config/http.service'
import { UserService } from '../../config/user.service'

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})
export class PayPage {

  constructor(public navCtrl: NavController,
    private http: wyHttpService,
    private userservice: UserService,
    private promptAlert: AlertController,
    private navParams: NavParams) {
  }
  streamTrack = [];
  imgBase = '';
  phoneNumber = null;
  user_id = null;
  face_token = null;
  int1 = null;
  int2 = null;
  i = 0;
  aliAccount = null;
  video = null;
  canvas = null;
  ctx = null;
  isUser: boolean = false;
  tradeNumber:string=null;
  isCamraOn:boolean=false;
  ngOnInit() {
    // setTimeout(this.getH5Cameral(), 0)
    console.log('iii');
    this.video = document.getElementById('video3');
    this.canvas = document.getElementById('canvas3');
    this.ctx = this.canvas.getContext('2d');
    this.getH5Cameral()
    console.log(this.navParams)
    this.tradeNumber=this.navParams['data']['tradeNumber'];
    console.log(this.tradeNumber)
  }
  getH5Cameral() {
    let _self = this;
    if (this.isCamraOn) return
    console.log('123')
    // video.srcObject = null; 
    // console.log(navigator.mediaDevices)
    // console.log(navigator.mozGetUserMedia)
    // console.log(navigator.webkitGetUserMedia)
    // console.log(navigator.getUserMedia)

    // if (navigator.mediaDevices === undefined) {
    //   navigator.mediaDevices = {};
    // }
    console.log(navigator.mediaDevices)
    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia 
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    // if (navigator.mediaDevices.getUserMedia === undefined) {
    //   navigator.mediaDevices.getUserMedia = function (constraints) {

    //     // 首先，如果有getUserMedia的话，就获得它
    //     var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //     // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
    //     if (!getUserMedia) {
    //       return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    //     }

    //     // 否则，为老的navigator.getUserMedia方法包裹一个Promise
    //     return new Promise(function (resolve, reject) {
    //       getUserMedia.call(navigator, constraints, resolve, reject);
    //     });
    //   }
    // }
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 300, height: 300 }, audio: false }).then(stream => {
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
    //     // video.setAttribute('height','300')
    //     // console.log(stream)
    //     // let video = document.getElementById('video');

    //     this.video.srcObject = stream;
    //     // console.log('ww',_self.video.videoHeight)

    //     this.video.onloadedmetadata = function (e) {
    //         _self.video.play();
    //     };
    //     _self.streamTrack = stream.getVideoTracks();
    //     setTimeout(() => {
    //         _self.drawImage()
    //     }, 1700)
    //     // setTimeout(() => {
    //     //     // console.log(canvas.toDataURL('image/png').slice(22))
    //     //     _self.askServer(_self.canvas.toDataURL("image/png"))
    //     // }, 2500)
    // }).catch(err => {
    //     // alert(err.name)
    //     // alert(err.message)
    //     console.log(err)
    // })
    navigator.getUserMedia({ video: { width: 300, height: 300 }, audio: false }, stream => {
      // navigator.getUserMedia({ video: true, audio: false }, stream => {
      // video.setAttribute('height','300')
      // console.log(stream)
      // let video = document.getElementById('video');

      this.video.srcObject = stream;
      // console.log('ww',_self.video.videoHeight)
      _self.isCamraOn=true;
      this.video.onloadedmetadata = function (e) {
        _self.video.play();
      };
      _self.streamTrack = stream.getVideoTracks();
      setTimeout(() => {
        _self.drawImage()
      }, 1700)
      setTimeout(() => {
        // console.log(canvas.toDataURL('image/png').slice(22))
        _self.askServer(_self.canvas.toDataURL("image/png"))
      }, 2500)
    }, err => {
      // alert(err.name)
      // alert(err.message)
      console.log(err)
    })
  }
  drawImage() {
    // let _self = this;
    // if(this.video.paused||this.video.ended){
    //     console.log('video stop')
    //     return
    // }
    this.int1 = setInterval(() => {
      console.log('drawing')
      this.ctx.drawImage(this.video, 0, 0);
    }, 50)
    // setTimeout(_self.drawImage(),0)
    // setTimeout(_self.stopCameral(),10000)
  }
  stopCameral() {
    if (this.streamTrack.length == 0) return;
    // let stream = video.srcObject;
    // let tracks = stream.getTracks();
    this.streamTrack.forEach(function (track) {
      track.stop();
    });

    this.video.srcObject = null;
    // this.streamTrack[0].stop();
    // let video = document.getElementById('video');
    // video.stop();
    clearInterval(this.int1);
    this.int1 = null;
    this.isCamraOn=false; 
    // clearInterval(this.int2)
  }
  askServer(base64) {
    let _self = this;
    //在人脸群中查找
    _self.stopCameral();
    this.http.faceSearch(base64.slice(22)).then((data: any) => {
      console.log(data)
      //查到登陆成功
      if (data.results && data.results[0].confidence > 90) {
        console.log(data.results[0].confidence > 90)
        _self.face_token = data.results[0].face_token;
        _self.getLoginInfo(data.results[0].face_token)

        // return this.getLoginInfo(data.results[0].face_token)
      } else if (data.faces.length == 0) {
        let loginSuccessAlert = this.promptAlert.create({
          title: '提示',
          message: "未检测到人脸信息，请点确认重新检测",
          buttons: [
            {
              text: '取消',
              handler: data => {
                console.log('detect failed');
              }
            },
            {
              text: '确认',
              handler: data => {
                // console.log('detect failed');
                this.getH5Cameral()
              }
            }
          ]
        })
        loginSuccessAlert.present();
      } else {
        //查不到请求注册
        // this.showPrompt(data.faces[0].face_token, base64)
        let loginSuccessAlert = this.promptAlert.create({
          title: '提示',
          message: "未检测到人脸信息，请点确认重新检测",
          buttons: [
            {
              text: '取消',
              handler: data => {
                console.log('detect failed');
              }
            },
            {
              text: '确认',
              handler: data => {
                // console.log('detect failed');
                this.getH5Cameral()
              }
            }
          ]
        })
        loginSuccessAlert.present();
      }
    }).catch(err => {
      console.log(err)
    })
    // this.stopCameral();
  }
  getLoginInfo(face_token) {
    console.log(face_token)
    let _self = this;
    this.http.getLoginInfo(face_token).then(data => {
      console.log(data)
      _self.face_token = data[0][0]
      _self.user_id = data[0][2]
      _self.phoneNumber = data[0][1]
      // this.userservice.login(face_token, base64)
      // let loginSuccessAlert = this.promptAlert.create({
      //     title: '提示',
      //     message: "登陆成功",
      //     buttons: [
      //          {
      //             text: '确认',
      //             handler: data => {
      //                 console.log('loginSuccesss');
      //                 // this.navCtrl.pop()
      //             }
      //         }
      //     ]
      // })
      // loginSuccessAlert.present();
    }).then(() => {
      const prompt = this.promptAlert.create({
        title: '提示',
        message: "输入手机号位数后四位确认",
        inputs: [
          {
            name: 'phonenumber',
            placeholder: '手机尾号四位'
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
            text: '确认',
            handler: data => {
              // this.aliAccount = data['aliAccount'];
              // console.log('保存',data['请输入支付宝账号']);
              // console.log('保存', data['aliAccount']);
              // console.log('保存', data['phonenumber']);
              // console.log('保存', face_token);
              // this.register(face_token, data['phonenumber'], base64)
              if (data['phonenumber'] == _self.phoneNumber) {
                _self.isUser = true;
                _self.goPay()
              }else{
                return false;
              }
            }
          }
        ]
      });
      prompt.present();
    })
  }
  goToMyOrderPage(e) {
    console.log('dd')
    this.navCtrl.push(OrderPage)
  }
  goPay() {
    console.log(this.tradeNumber)
    if (!this.tradeNumber) {return;}
    let url=`alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fneighbour.southeastasia.cloudapp.azure.com%2FaliPay%2Findex.html%3FtradeNo%3D${this.tradeNumber}`
    window.open(url,'_system', 'location=yes');
  }
  ionViewWillLeave() {
    console.log('willleave')
    console.log(this.userservice.userInfo)
    this.stopCameral();
  }
  // window.location.href='alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=http%3A%2F%2F172.20.10.11%3A8080%2FAlipay%2Findex.html%3FtradeNo%3D2018072421001004910578660565'

}
