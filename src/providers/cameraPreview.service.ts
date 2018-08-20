import { Injectable } from '@angular/core'
import { CameraPreview} from '@ionic-native/camera-preview';

@Injectable()
export class CameraPreviewService {

    constructor(private cameraPreview: CameraPreview) { }
    // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview


    // start camera
    startCamera() {
        const cameraPreviewOpts = {
            x: 0,
            y: 0,
            width: window.screen.width,
            // width: 720,
            height: window.screen.height,
            // height: 1280,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: true,
            toBack: true,
            alpha: 1
        };
        return this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
                console.log(res)
                return Promise.resolve(res)
            },
            (err) => {
                console.log(err)
                return Promise.reject(err)                
            });
    }


    // Set the handler to run every time we take a picture
    // this.cameraPreview.setOnPictureTakenHandler().subscribe((result) => {
    //     console.log(result);
    //     // do something with the result
    // });


    // picture options


    // take a picture
    takePicture() {
        const pictureOpts = {
            width: window.screen.width,
            // width: 720,
            // height: 1280,
            height: window.screen.height,
            // quality: 100
        }
        console.log(pictureOpts.width)
        return this.cameraPreview.takePicture(pictureOpts)
    }



    // Switch camera
    SwitchCamera() {
        this.cameraPreview.switchCamera();

    }

    // set color effect to negative
    // this.cameraPreview.setColorEffect('negative');

    // Stop the camera preview
    StopCameraPreview() {
        this.cameraPreview.stopCamera();

    }
    getSupportedPictureSizes(){
        return this.cameraPreview.getSupportedPictureSizes()  
    }
    setZoom(zoom:number){
        return this.cameraPreview.setZoom(zoom);
    }
}