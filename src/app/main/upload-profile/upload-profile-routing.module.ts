import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UploadProfileComponent } from "./upload-profile.component";

const routes: Routes = [
  {
    path: '',
    component: UploadProfileComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class UploadProfileRoutingModule {
}
