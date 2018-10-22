import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
// import { window } from 'rxjs/operator/window';
// if (process.env.IONIC_ENV === 'prod') { 
//     console.log('we got a production buildp'); 
// } else { 
//     console.log('we got a development build'); 
// }
// let baseUrl="http://127.0.0.1:8082"
// let baseUrl="http://10.10.0.124:8082"
let baseUrl="http://168.63.253.125:8080"
let baseUrl2="http://168.63.253.125:8082"
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // 'Accept': 'text/plain'
        // 'Content-Type': 'multipart/form-data;charset=UTF-8',
        // 'Content-Type': 'application/json'
    })
}
const resetParams = function (obj) {
    if (typeof (obj) != "object") {
        return {}
    }
    let newParamString = []
    for (let i in obj) {
        newParamString.push(i + "=" + obj[i])
    }
    return newParamString.join('&')
}
@Injectable()
export class wyHttpService {
    constructor(private http: HttpClient) {

    }
    ////云从    // "_comments":" 云从http://15.107.20.49:7010",

    app_id = 'user'
    app_secret = '12345'
    groupId = 'wyyGroup20180703'
    //IdentificationProcess
    //步骤
    // 1、/face/clustering/face/create 创建3个人脸，faceId参数为face_1、face_2、face_3
    faceCreate(base64) {
        let url = `/test/face/clustering/face/create`
        let faceId = `wyyFaceGroup${new Date().getTime()}`
        return this.http.post(url, {
            app_id: this.app_id,
            app_secret: this.app_secret,
            faceId: faceId,
            tag: 'facegroup',
            groupId: this.groupId,
            img: base64
        }, httpOptions).toPromise().then(data => {
            // console.log(data)
            return Promise.resolve(faceId)
        })
    }
    //2、/face/clustering/group/create 创建1个组，groupId参数为group_1
    groupCreate() {
        let url = `/test/face/clustering/group/create`
        return this.http.post(url, {
            app_id: this.app_id,
            app_secret: this.app_secret,
            groupId: this.groupId,
            tag: 'facegroup'
        }, httpOptions).toPromise().then(data => {
            console.log(data)
        })
    }
    //3、/face/clustering/group/addFace 在组group_1中添加3个人脸 face_1、face_2、face_3
    groupAddFace(faceId) {
        let url = `/test/face/clustering/group/addFace`
        return this.http.post(url, {
            app_id: this.app_id,
            app_secret: this.app_secret,
            faceId: faceId,
            groupId: this.groupId
        }, httpOptions).toPromise().then(data => {
            console.log(data)
        })
    }
    //4、/face/recog/group/identify 组内进行识别，groupId参数为group_1
    groupIdentify(base64) {
        let url = `/test/face/recog/groupidentify`
        return this.http.post(url, {
            app_id: this.app_id,
            app_secret: this.app_secret,
            groupId: 'wyyFaceGroup',
            img: base64,
            topN: 1
        }, httpOptions).toPromise().then(data => {
            console.log(data)
        })
    }
    //获取人脸信息
    getFaceInfo(base64Data) {
        let url = `/test/face/tool/detect`
        let params = {
            app_id: 'user',
            app_secret: '12345',
            img: base64Data,
            // type:0
        }
        return this.http.post(url, params, httpOptions)
            .toPromise().then(data => {
                console.log(data)
            })
    }
    //face++
    api_key = "Qu0TPswwSUngp1b51OOzP7mQqCbPBPla"
    api_secret = "eLZaWcRBKnSPHX2szqqDrVDMMrBpJVSX"
    faceset_token = '3fd3c3e51cd9fca2927e2811ef44d1e8'
    //https://api-cn.faceplusplus.com/facepp/v3/faceset/create
    // "_comments2":" face++https://api-cn.faceplusplus.com",

    createFaceSet() {
        // let url = `/test/facepp/v3/faceset/create`
        let url=`https://api-cn.faceplusplus.com/facepp/v3/faceset/create`
        // let body=new FormData()
        // body.append('api_key','XxEFbIvXwDkMrmreioU6uDXB1fR_Wr_A')
        // body.append('api_secret','sD1fFL_-lTSsjsMBdJU0OUpGSQfl9AAH')
        // let params = {
        //     "api_key": this.api_key,
        //     "api_secret": this.api_secret,
        //     "display_name": "beautyFaces",
        //     "outer_id": "faceSet1",
        //     "tags": "脸的集合1",
        //     "user_data": "脸的集合1",
        //     "force_merge": 0
        // }
        let params=`api_key=Qu0TPswwSUngp1b51OOzP7mQqCbPBPla&api_secret=eLZaWcRBKnSPHX2szqqDrVDMMrBpJVSX`
        return this.http.post(url,params,httpOptions)
        .toPromise().then(data => {
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
        // console.log(resetParams(params))
    }
    //step2 识别人脸
    faceDetect(base64) {
        let url = `/test/facepp/v3/detect`
        // let url=`https://api-cn.faceplusplus.com/facepp/v3/detect`
        // let url=`https://16.153.99.60:8080/facepp/v3/detect`
        let params = resetParams({
            // let params={
            api_key: this.api_key,
            api_secret: this.api_secret,
            image_base64: encodeURIComponent(base64),
            return_attributes: "eyestatus,gender"
        })
        // console.log(params)
        return this.http.post(url, params, httpOptions)
            .toPromise().then(data => {
                // console.log(data.faces[0].face_token)
                return Promise.resolve(data)
            }).catch(err => {
                console.log(err)
            })
    }
    //step3
    faceSetAddface(face_token) {
        let url = 'https://api-cn.faceplusplus.com/facepp/v3/faceset/addface'
        let params = resetParams({
            api_key: this.api_key,
            api_secret: this.api_secret,
            // faceset_token: "3fd3c3e51cd9fca2927e2811ef44d1e8",
            faceset_token: "cef667c0a8b05c0fd63f759526961981",
            face_tokens: face_token
        })
        return this.http.post(url, params, httpOptions)
            .toPromise()
    }
    // 移除一个FaceSet中的某些或者全部face_token
    // 需要移除的人脸标识字符串，可以是一个或者多个face_token组成，用逗号分隔。最多不能超过1,000个face_token
    //注：face_tokens字符串传入“RemoveAllFaceTokens”则会移除FaceSet内所有的face_token
    removeAllFaces(facetoken:string){
        let url = 'https://api-cn.faceplusplus.com/facepp/v3/faceset/removeface'
        let params = resetParams({
            api_key: this.api_key,
            api_secret: this.api_secret,
            faceset_token: "cef667c0a8b05c0fd63f759526961981",
            face_tokens: facetoken
        })
        return this.http.post(url, params, httpOptions).toPromise()
    }
    //登陆seach
    faceSearch(base64) {
        let url=`https://api-cn.faceplusplus.com/facepp/v3/search`
        // let url = `/test/facepp/v3/search`
        let params = resetParams({
            // let params={
            api_key: this.api_key,
            api_secret: this.api_secret,
            image_base64: encodeURIComponent(base64),
            // faceset_token: "3fd3c3e51cd9fca2927e2811ef44d1e8"
            faceset_token: "cef667c0a8b05c0fd63f759526961981",
        })
        // console.log(params)
        return this.http.post(url, params, httpOptions)
            .toPromise().then(data => {
                // console.log(data)
                return Promise.resolve(data)
            }).catch(err => {
                console.log(err)
                return Promise.reject(err)
            })
    }
    //register注册
    registerDB(face_token,phonenumber){
        // let url=`/boba/api/add`
        let url=`${baseUrl}/api/add`
        let params=resetParams({
            face_id:face_token,
            // face_id:'bdc98ac97e05407786ded5cf88c4c189',
            phoneNumber:phonenumber,
            user_id:null,
            openid:null
            // alipay_userid:aliAccount
        })
        // let params=resetParams({
        //     face_id:'bdc98ac97e05407786ded5cf88c4c189',
        //     // face_id:'bdc98ac97e05407786ded5cf88c4c189',
        //     phoneNumber:'222',
        //     user_id:new Date().getTime()
        //     // alipay_userid:aliAccount
        // })
        return this.http.post(url,params,httpOptions).toPromise()
    }
    //getlogin
    getLoginInfo(face_token){
        // let url=`/boba/api/login?face_id=${face_token}`
        let url=`${baseUrl}/api/login?face_id=${face_token}`
        console.log(url)
        return this.http.get(url).toPromise().then(data => {
            // console.log(data)
            return data
        }).catch(err => {
            console.log(err)
        })
    }
    //getwangzi
    //localhost:8082/getUserLoginSign
    getSignInfo(targetId){
        // let url=`http://10.10.0.124:8082/getUserLoginSign`
        // let url=`http://neighbour.southeastasia.cloudapp.azure.com:8082/getUserLoginSign`
        // let url=`http://127.0.0.1:8082/getUserLoginSign`
        // let url=`http://192.168.0.5:8082/getUserLoginSign?targetId=${targetId}`
        // let url=`/test/getUserLoginSign`
        let url=`${baseUrl2}/getUserLoginSign?targetId=${targetId}`
        let params = resetParams({
            targetId:targetId 
        })
        return this.http.get(url,params).toPromise()
    }
    getUserId(code){
        let url=`${baseUrl2}/getAuthToken`
        let params = resetParams({
            code:code
            // code:'5edf03d0c2714650b34477896c0fNA25'
        })
        return this.http.post(url,params,httpOptions).toPromise()
    }
    getTradeNumber(userId){
        // let url=`http://10.10.0.124:8082/createOrder`
        // let url=`http://192.168.0.5:8082/createOrder`
        
        
        
        // let url=`http://127.0.0.1:8082/createOrder`
        // let url=`http://neighbour.southeastasia.cloudapp.azure.com:8082/createOrder`
        let url=`${baseUrl2}/createOrder`
        // let url=`http://172.20.10.11:8082/createOrder`
        let params = resetParams({
            outTradeNo:new Date().getTime(),
            userId:userId
        })
        return this.http.post(url,params,httpOptions).toPromise().then(data => {
            // console.log(data)
            return Promise.resolve(data)
        }).catch(err => {
            console.log(err)
            return Promise.reject(err)
        })
    }
    jpushPost(number,user_id){
        // let url=`/jpush/v3/push`
        let url=`https://bjapi.push.jiguang.cn/v3/push`
        // let url=`apis/v3/push`
        
        let authcode="3b7d0a157740f6d5fd8802b6:a5b1028a870aca4ff8dc1b32"
        let base64=window.btoa(authcode)
        console.log(base64)
        console.log(window.atob(base64))
        let headers= new HttpHeaders({
            // "Content-Type": "application/json"
            Authorization:`Basic ${base64}`
        })
        // headers.append('Authorization',base64)
        const httpOptions = {
            headers:headers
        }
        let data={
            // "cid": "8103a4c628a0b98974ec1949-711261d4-5f17-4d2f-a855-5e5a8909b26e",
            "platform": "android",
            "audience": {
                "alias":[user_id]
            },
            "notification": {
                "android": {
                    "alert": "你有一张待支付订单",
                    "title": "Send to Android",
                    "builder_id": 1,
                    "extras": {
                        "tradeNum": number
                    }
                },
                // "ios": {
                //     "alert": "Hi, JPush!",
                //     "sound": "default",
                //     "badge": "+1",
                //     "extras": {
                //         "newsid": 321
                //     }
                // }
            },
            "message": {
                "msg_content": "Hi,JPush",
                "content_type": "text",
                "title": "msg",
                "extras": {
                    "teadeNum": number
                }
            },
            // "sms_message":{
            //    "temp_id":1250,
            //    "temp_para":{
            //         "code":"123456"
            //    },
            //     "delay_time":3600
            // },
            // "options": {
            //     "time_to_live": 60,
            //     "apns_production": false,
            //     "apns_collapse_id":"jiguang_test_201706011100"
            // }
        }
        return this.http.post(url,data,httpOptions).toPromise()
    }
    getQRcode(data){
        // this.http.get
    }
    wechatUnifiedOrder(){
        // let url="https://api.mch.weixin.qq.com/pay/unifiedorder";
        let url=`/wechat/pay/unifiedorder`
        
        let nonce_str=this.randomString(32);//随机数
        console.log('nonce_str',nonce_str);        
        let data={
            appid:'wx5055b021a210708c',
            attach:'attach',
            body:'app支付测试',
            mch_id:'1469962302',
            nonce_str:nonce_str,
            notify_url:'http://neighbour.southeastasia.cloudapp.azure.com/Alipay/platform.html',
            out_trade_no:'1415659990',
            spbill_create_ip:'14.23.150.211',
            total_fee:'0.01',
            trade_type:'JSAPI',
        }
        let stringA=`appid=wx5055b021a210708c&attach=test&body=apptest&mch_id=1469962302&nonce_str=${nonce_str}&notify_url=http://neighbour.southeastasia.cloudapp.azure.com/Alipay/platform.html&out_trade_no=1415659990&spbill_create_ip=14.23.150.211&sub_mch_id=1472856802&total_fee=0.01&trade_type=JSAPI`
        let stringSigntemp=stringA+"&key=F3E006BA853A18421ECE7A5723C92741"
        console.log(window['hex_md5'](stringSigntemp))
        let params={
            data:`<xml>
            <appid>wx5055b021a210708c</appid>
            <attach>test</attach>
            <body>apptest</body>
            <mch_id>1469962302</mch_id>
            <nonce_str>${nonce_str}</nonce_str>
            <notify_url>http://neighbour.southeastasia.cloudapp.azure.com/Alipay/platform.html</notify_url>
            <out_trade_no>1415659990</out_trade_no>
            <spbill_create_ip>14.23.150.211</spbill_create_ip>
            <sub_mch_id>1472856802</sub_mch_id>
            <total_fee>0.01</total_fee>
            <trade_type>APP</trade_type>
            <sign>${window['hex_md5'](stringSigntemp)}</sign>
         </xml>`
        }
        this.http.post(url,params.data).toPromise().then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
        
    }
    //随机数生成
    randomString(len) {
        　　len = len || 32;
        　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (let i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        }
    aliPayOrder(){
        
    }
}
