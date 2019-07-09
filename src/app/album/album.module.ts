import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { HostComponent } from './host/host.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatTooltipModule } from '@angular/material';

import { environment } from '../../environments/environment'; // 追加
import { AngularFireModule } from '@angular/fire'; // 追加
import { AngularFirestoreModule } from '@angular/fire/firestore'; // 追加
import { AngularFireAuthModule } from '@angular/fire/auth'; // 追加
import { AngularFireStorageModule } from '@angular/fire/storage'; // 追加

import { FlexLayoutModule } from '@angular/flex-layout'; // 追加
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [HostComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // 追加
    AngularFirestoreModule,  // 追加
    AngularFireAuthModule,  // 追加
    AngularFireStorageModule, // 追加
    FlexLayoutModule, // 追加
    OverlayModule
  ]
})
export class AlbumModule { }
