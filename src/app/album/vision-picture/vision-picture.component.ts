import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { AlbumService } from '../album.service';
@Component({
  selector: 'app-vision-picture',
  templateUrl: './vision-picture.component.html',
  styleUrls: ['./vision-picture.component.scss']
})
export class VisionPictureComponent implements OnInit, OnDestroy {

  constructor(private albumService: AlbumService) { }

  @ViewChild('fileInput', {static: false}) fileInput;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  public faceAnnotations: any;

  picture;
  private decisions = {
    UNKNOWN: '判定不能',
    VERY_UNLIKELY: '可能性1%',
    UNLIKELY: '可能性25%',
    POSSIBLE: '可能性50%',
    LIKELY: '可能性75%',
    VERY_LIKELY: '可能性99%'};

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  ngOnDestroy() {
    this.showWebcam = false;
  }

  //   /**
  //  * @desc アップロードボタンが押されたことを検知する
  //  */
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  //   /**
  //  * @desc ファイルが選択されたことを検知する
  //  */
  onChangeFileInput(): void {
    // const files: { [key: string]: File } = this.fileInput.nativeElement.files[0];
    const files = this.fileInput.nativeElement.files[0];
    console.log(files);
    // ファイルリーダー作成
    const fileReader = new FileReader();
    fileReader.readAsDataURL( files ) ;
    // 読み込み完了時のイベント
    fileReader.onload = () => {
      this.picture = fileReader.result;
      const photoData = fileReader.result.toString().split(',');
      console.log(photoData);
      console.log(photoData[1]);
      this.callVisionApi(photoData[1]);
    };

  }

  public triggerSnapshot(): void {
    if (this.showWebcam) {
      this.trigger.next();
      this.showWebcam = false;
    } else {
      this.picture = null;
      this.showWebcam = true;
    }
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public callVisionApi(imageAsBase64) {
    const visionData = {
      requests: [
        {
          image: {
            content: imageAsBase64
          },
          features: [
            {
              type: 'FACE_DETECTION',
              maxResults: 100
            }
          ]
        }
      ],
    };
    this.albumService.postVisionApiData(visionData).subscribe(result => {
      console.log('result');
      console.log(result);
      const responses: any = result;  // <<<<< 違いはココ <<<<<
      this.faceAnnotations = responses.responses[0].faceAnnotations;
      console.log('this.faceAnnotations');
      console.log(this.faceAnnotations);
      this.showWebcam = false;
    });
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    // this.webcamImage = webcamImage;
    this.picture = webcamImage.imageAsDataUrl;
    this.callVisionApi(webcamImage.imageAsBase64);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
