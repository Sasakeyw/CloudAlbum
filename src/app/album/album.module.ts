import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';
import { HostComponent } from './host/host.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { HttpClientModule } from '@angular/common/http';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatTooltipModule,
  MatMenuModule, MatInputModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from '../../environments/environment'; // 追加
import { AngularFireModule } from '@angular/fire'; // 追加
import { AngularFirestoreModule } from '@angular/fire/firestore'; // 追加
import { AngularFireAuthModule } from '@angular/fire/auth'; // 追加
import { AngularFireStorageModule } from '@angular/fire/storage'; // 追加

import { FlexLayoutModule } from '@angular/flex-layout'; // 追加
import { OverlayModule } from '@angular/cdk/overlay';
import { VisionPictureComponent } from './vision-picture/vision-picture.component';
import {WebcamModule} from 'ngx-webcam';
import { VisionOcrComponent } from './vision-ocr/vision-ocr.component';
import { VisionAnnotationComponent } from './vision-annotation/vision-annotation.component';
import { MapSearchComponent } from './map-search/map-search.component';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  declarations: [HostComponent, HamburgerMenuComponent, VisionPictureComponent, VisionOcrComponent,
     VisionAnnotationComponent, MapSearchComponent],
  imports: [
    CommonModule, HttpClientModule,
    AlbumRoutingModule, FormsModule,
    MatProgressSpinnerModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatTooltipModule, MatMenuModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // 追加
    AngularFirestoreModule,  // 追加
    AngularFireAuthModule,  // 追加
    AngularFireStorageModule, // 追加
    FlexLayoutModule, // 追加
    OverlayModule,
    WebcamModule,
    GoogleMapsModule
  ]
})
export class AlbumModule { }
