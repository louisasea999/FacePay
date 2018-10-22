// import { Injectable } from '@angular/core'
// import { JPush } from '@jiguang-ionic/jpush';

// @Injectable()
// export class UserService {
//     constructor(public JPush:JPush) {

//     }
//     // userId:string;
//     // face_token:string;
//     // phoneNumber:string;
//     userInfo = {
//         face_token: null,
//         imgBase: null,
//         targetId: null,
//         user_id: null,
//         phoneNumber: null
//     };
//     loginFlg: boolean;
    
//     login(face_token: string, imgBase: string, targetId: string, user_id: string, phoneNumber: string) {
//         this.loginFlg = true;
//         this.userInfo.face_token = face_token;
//         this.userInfo.imgBase = imgBase;
//         this.userInfo.targetId = targetId;
//         this.userInfo.user_id = user_id;
//         this.userInfo.phoneNumber = phoneNumber;
//         console.log(this.JPush)
//         this.JPush['setAlias']({ sequence: 1, alias: user_id }).then((result) => {
//             console.log('alias',result)
//             // var sequence = result.sequence
//             // var alias = result.alias
//         }, (error) => {
//             console.log(error)
//             // var sequence = error.sequence
//             // var errorCode = error.code
//         })
//     }
//     logout() {
//         this.resetData();
//         this.JPush['deleteAlias']({ sequence: 1 }).then((result) => {
//             // var sequence = result.sequence
//             console.log('deleteAlias',result)
//         }, (error) => {
//             console.log('deleteAlias',error)
//             // var sequence = error.sequence
//             // var errorCode = error.code
//         })
//     }
//     isLogin() {
//         return this.loginFlg
//     }
//     private resetData() {
//         this.userInfo.face_token = null;
//         this.userInfo.imgBase = null;
//         this.userInfo.targetId = null;
//         this.loginFlg = false;
//     }
// }

import { Injectable } from '@angular/core'

@Injectable()
export class UserService {
    constructor() {

    }
    // userId:string;
    // face_token:string;
    // phoneNumber:string;
    userInfo = {
        face_token: null,
        imgBase: null,
        targetId: null,
        user_id: null,
        phoneNumber: null
    };
    loginFlg: boolean;
    
    login(face_token: string, imgBase: string, targetId: string, user_id: string, phoneNumber: string) {
        this.loginFlg = true;
        this.userInfo.face_token = face_token;
        this.userInfo.imgBase = imgBase;
        this.userInfo.targetId = targetId;
        this.userInfo.user_id = user_id;
        this.userInfo.phoneNumber = phoneNumber;
        
    }
    logout() {
        this.resetData();
    }
    isLogin() {
        return this.loginFlg
    }
    private resetData() {
        this.userInfo.face_token = null;
        this.userInfo.imgBase = null;
        this.userInfo.targetId = null;
        this.loginFlg = false;
    }
}

