import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { PiclistItem } from '../albumitems';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {

  @ViewChild('fileInput', {static: false}) fileInput;
  file: File | null = null;
  firestore;
  storageRef;
  imageLists: any[] = [];

  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  /**
   * @desc Constructor
   */
  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage,
              private changeDetectorRef: ChangeDetectorRef, private overlay: Overlay) {

    // DI依存性の注入
    this.firestore = angularFirestore.firestore;
    this.storageRef = angularFireStorage.storage.ref();
    this.initFirebase();

    // this.spinner.attach(new ComponentPortal(MatSpinner));
    // setTimeout(() => {
    //   this.initFirebase();
    //   // ローディング終了
    //   this.spinner.detach();
    // }, 3000);
  }

  ngOnInit() {
  }

  /**
   * @desc Firebaseの初期設定
   */
  initFirebase() {
    // 画像の情報をFirestoreから読み出し
    this.firestore.collection('images')
      .orderBy('updatedDate')
      .onSnapshot(async (querySnapshot) => {
        for (const change of querySnapshot.docChanges()) {
          console.log('change.type');
          console.log(change.type);
          if (change.type === 'added') {
            await this.loadPictures(change.doc.id,
              change.doc.data().fileName);
          } else if (change.type === 'removed') {
            this.imageLists = this.imageLists.filter(x => x.key !== change.doc.id);
          }
        }
      });
  }

  /**
   * @desc Download Pictures
   * @param key identify key
   * @param fileName saved image file name
   * @return  FirebaseのPromise
   */
  loadPictures(key, fileName) {
    //  単一の画像をダウンロード
    return this.storageRef.child(`images/${fileName}`)
      .getDownloadURL()
      .then((url) => {
        this.displayPicture(key, url, fileName);
      });
  }

  /**
   * @desc Display a Picture in the UI
   * @param key identify key
   * @param picUrl 表示画像のURL
   * @param fileName saved image file name
   */
  displayPicture(key, picUrl, fileName) {
    // 表示する子要素のcontainerを取得
    const piclistItems = new PiclistItem();
    piclistItems.key = key;
    piclistItems.url = picUrl;
    piclistItems.fileName = fileName;
    this.imageLists.push(piclistItems);
  }

  /**
   * @desc ファイルが選択されたことを検知する
   */
  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.uploadImage(files);
  }

  /**
   * @desc アップロードボタンが押されたことを検知する
   * @param event イベントオブジェクト
   */
  uploadClicked(event) {
    event.preventDefault();
    this.uploadImage(event);
  }

  /**
   * @desc アップロードボタンが押されたことを検知する
   */
  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * @desc ファイル選択後に呼ばれる
   * @param  list firastoreに登録される項目
   */
  uploadImage(list) {
    // ファイルアップロード処理
    if (list.length <= 0) { return; }
    const file = list[0];
    const extension = file.name.split('.').pop();
    const fileName = `${Date.now()}.${extension}`;
    const imageRef = this.storageRef.child(`images/${fileName}`);
    // ファイルアップロード
    imageRef.put(file).then(() => {
      console.log('Uploaded file');
      // 画像情報をFirestoreに保存する
      this.saveImageInfo(fileName);
    });
  }

  /**
   * @desc ファイル名を指定して、その情報をfirestoreに保存する
   * @param  fileName 保存するファイル名
   */
  saveImageInfo(fileName) {
    this.firestore.collection('images')
      .add({
        fileName,
        isThumb: false,
        updatedDate: new Date(),
      })
      .then(() => {
        console.log('Document saved');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  /**
   * @desc 削除ボタンが押されたことを検知する
   * @param key identify key
   * @param fileName saved image file name
   */
  onClickFileClearButton(key, fileName) {
    if (!window.confirm('削除しますか？')) {
      console.log('return delete');
      return;
    }
    // storageからファイル削除後DB削除
    const imageRef = this.storageRef.child(`images/${fileName}`);
    imageRef.delete().then(() => {
      this.firestore.collection('images').doc(key).delete();
      console.log('file delete');
    })
      .catch((error) => {
        console.error('Error delete file: ', error);
      });
  }


}
