import { Injectable } from '@angular/core'

@Injectable()
export class UserService{
    // userId:string;
    // face_token:string;
    // phoneNumber:string;
    userInfo={
        face_token:null,
        imgBase:null,
        targetId:null,
        user_id:null,
        phoneNumber:null
    };
    loginFlg:boolean;
    constructor(){

    }
    login(face_token:string,imgBase:string,targetId:string,user_id:string,phoneNumber:string){
        this.loginFlg=true;
        this.userInfo.face_token=face_token;
        this.userInfo.imgBase=imgBase;
        this.userInfo.targetId=targetId;
        this.userInfo.user_id=user_id;
        this.userInfo.phoneNumber=phoneNumber
    }
    logout(){
        this.resetData();
    }
    isLogin(){
        return this.loginFlg
    }
    private resetData(){
        this.userInfo.face_token=null;
        this.userInfo.imgBase=null;
        this.userInfo.targetId=null;
        this.loginFlg=false;
    }
}
//distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip


