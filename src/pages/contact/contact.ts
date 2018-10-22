import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OrderPage } from '../orders/order';
import { Platform } from 'ionic-angular';

import { wyHttpService } from '../../config/http.service'
import { UserService } from '../../config/user.service'
import { CameraPreviewService } from '../../providers/cameraPreview.service';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
    private http: wyHttpService,
    private userservice: UserService,
    private promptAlert: AlertController,
    private platform: Platform, private previewcamera: CameraPreviewService, private device: Device, ) {
  }
  streamTrack = [];
  imgBase = '';
  img = null;
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
  cameraOn: boolean = false;
  previewOn: boolean = false;
  ngOnInit() {
  }
  startAnimation() {
    this.previewOn = !this.previewOn;
  }
  ionViewWillEnter() {
    console.log('contact');
    this.video = document.getElementById('video1');
    this.canvas = document.getElementById('canvas1');
    this.ctx = this.canvas.getContext('2d');
    console.log(this.platform)
    // this.getH5Cameral()
    this.takePicture()
    // this.drawImage(false)

  }
  takePicture() {
    let _self = this;
    this.previewOn = true;
    // if (this.device.platform == "iOS") {
    console.log('ios')
    _self.previewcamera.startCamera({}).then(data => {
      console.log('previewcamera', data)
      _self.previewcamera.getSupportedFlashModes().then(data => {
        console.log(data)
        if (data.length > 0) {
            //   _self.previewcamera.getFlashMode().then(data => {
            //     console.log(data)
            //   })
            return _self.previewcamera.setFlashMode('off').then(data => {
                console.log(data)
            })
        }
    }).then(() => {
      setTimeout(()=>{
        this.previewcamera.takePicture().then(data => {
          _self.imgBase = `data:image/jpeg;base64,${data[0]}`;
          _self.askServer(_self.imgBase)
          // console.log(_self.base64)
          _self.img = new Image()
          _self.img.src = _self.imgBase;
          _self.previewcamera.StopCameraPreview()
          // _self.drawImage();
          _self.previewOn = false;
      })
      },1000) 
    })
    }).catch(err => {
      console.log(err)
    });
    // } else {
    //     console.log('android')
    //     this.getH5Cameral()
    // }
  }
  getH5Cameral() {
    let _self = this;
    console.log('123', this.streamTrack.length)

    if (this.cameraOn) return
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
    // const option={ video: { facingMode: "user", width: 300, height: 300 }, audio: false }
    // navigator.mediaDevices.getUserMedia(option).then(stream => {
    //     // navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
    //     // video.setAttribute('height','300')
    //     // console.log(stream)
    //     // let video = document.getElementById('video');

    //     this.video.srcObject = stream;
    //     console.log('ww',_self.video.videoHeight)

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

      // this.video.srcObject = stream;
      this.video.src = window.URL.createObjectURL(stream);
      // console.log('ww',_self.video.videoHeight)
      this.cameraOn = true;
      this.video.onloadedmetadata = function (e) {
        _self.video.play();
      };
      _self.streamTrack = stream.getVideoTracks();
      setTimeout(() => {
        _self.drawImage(false)
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
  drawImage(rectangle) {
    console.log('drawing', rectangle)
    // if (this.device.platform == "iOS") {
    // } else {
    //     this.int1 = setInterval(() => {
    //         this.ctx.drawImage(this.video, 0, 0);
    //     }, 50)
    // }
    // setTimeout(_self.drawImage(),0)
    // setTimeout(_self.stopCameral(),10000)

    if (rectangle) {
      this.ctx.drawImage(this.img, rectangle.left - 50, rectangle.top - 50, 300, 300, 0, 0, 300, 300);
      // this.ctx.drawImage(this.img,0,0,300,300);
    } else {
      //     this.int1 = setInterval(() => {
      //         this.ctx.drawImage(this.video, 0, 0);
      let img = new Image();
      img.src = '../../assets/imgs/iu.jpeg';
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, 300, 300);

      }

      //     }, 50)
    }
  }
  stopCameral() {
    if (this.streamTrack.length == 0) return;
    // let stream = video.srcObject;
    // let tracks = stream.getTracks();
    this.cameraOn = false;
    this.streamTrack.forEach(function (track) {
      track.stop();
    });

    this.video.srcObject = null;
    // this.streamTrack[0].stop();
    // let video = document.getElementById('video');
    // video.stop();
    clearInterval(this.int1);
    this.int1 = null;
    // clearInterval(this.int2)
  }
  askServer(base64) {
    let _self = this;
    //在人脸群中查找
    _self.stopCameral();
    this.http.faceSearch(base64.slice(22)).then((data: any) => {
      console.log(data)
      //查到登陆成功
      if (data.faces.length == 0) {
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
                // this.getH5Cameral()
                this.takePicture()
              }
            }
          ]
        })
        loginSuccessAlert.present();
      } else {
        this.drawImage(data.faces[0].face_rectangle);
        if (data.results[0].confidence > 90) {
          _self.face_token = data.results[0].face_token;
          _self.getLoginInfo(data.results[0].face_token)
        } else {
          let loginSuccessAlert = this.promptAlert.create({
            title: '提示',
            message: "未检测到注册信息，请点确认重新检测",
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
                  // this.getH5Cameral()
                  this.takePicture();
                }
              }
            ]
          })
          loginSuccessAlert.present();
        }
      }
    }).catch(err => {
      console.log(err)
    })
    // this.stopCameral();
  }
  getLoginInfo(face_token) {
    console.log(face_token)
    let _self = this;
    this.http.getLoginInfo(face_token).then((data: any) => {
      console.log(data)
      if (data.length == 0) {
        let loginSuccessAlert = this.promptAlert.create({
          title: '提示',
          message: "未检测到注册信息，请注册后尝试",
          buttons: [
            // {
            //   text: '取消',
            //   handler: data => {
            //     console.log('detect failed');
            //   }
            // },
            {
              text: '确认',
              handler: data => {
                // console.log('detect failed');
                // this.getH5Cameral()
              }
            }
          ]
        })
        loginSuccessAlert.present();
      } else {
        _self.face_token = data[0][0]
        _self.user_id = data[0][2]
        _self.phoneNumber = data[0][1]
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
                } else {
                  return false;
                }
              }
            }
          ]
        });
        prompt.present();
      }
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
    })
  }
  goToMyOrderPage(e) {
    console.log('dd')
    this.navCtrl.push(OrderPage)
  }
  getTradeNumber() {
    let _self = this;
    // if (!this.userservice.userInfo.user_id) {
    //   alert('获取用户信息错误')
    //   return;
    // }
    // this.user_id='2088402239622912'

    console.log('user_id', this.user_id)
    return this.http.getTradeNumber(this.user_id).then((data: any) => {
      console.log(data.alipay_trade_create_response.trade_no)
      // _self.tradePay(data.alipay_trade_create_response.trade_no)
      _self.goPush(data.alipay_trade_create_response.trade_no)
    }
    ).catch(err => {
      console.log(err)
    })
  }
  goPush(tradeNumber) {
    console.log(tradeNumber)
    if (!this.userservice.userInfo.user_id) {
      let loginSuccessAlert = this.promptAlert.create({
        title: '提示',
        message: "获取用户user_id错误",
        buttons: [
          {
            text: '确认',
            handler: data => {
              // console.log('detect failed');
            }
          }
        ]
      })
      loginSuccessAlert.present();
    }
    if (!tradeNumber) { return; }
    this.http.jpushPost(tradeNumber, this.userservice.userInfo.user_id).then(data => {
      console.log(data)
      const prompt = this.promptAlert.create({
        title: '提示',
        message: "下单成功",
        buttons: [
          {
            text: '确认',
            handler: data => {

            }
          }
        ]
      });
      prompt.present();
    }, err => {
      console.log(err)
    });
  }
  ionViewWillLeave() {
    console.log('willleave')
    console.log(this.userservice.userInfo)
    // this.stopCameral();
    this.previewcamera.StopCameraPreview()
  }
}
