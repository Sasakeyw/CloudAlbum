import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'host' },
      { path: '', redirectTo: '', pathMatch: 'prefix' },
      { path: 'host', component: HostComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
