import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';
import { VisionPictureComponent } from './vision-picture/vision-picture.component';
import { VisionOcrComponent } from './vision-ocr/vision-ocr.component';
import { VisionAnnotationComponent } from './vision-annotation/vision-annotation.component';
import { MapSearchComponent } from './map-search/map-search.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'host' },
      { path: '', redirectTo: '', pathMatch: 'prefix' },
      { path: 'host', component: HostComponent },
      { path: 'vision-picture', component: VisionPictureComponent },
      { path: 'vision-ocr', component: VisionOcrComponent },
      { path: 'vision-annotation', component: VisionAnnotationComponent },
      { path: 'map-search', component: MapSearchComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
