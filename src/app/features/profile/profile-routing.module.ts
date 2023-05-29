import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from "./profile.component";
import { ProfileService } from "./services/profile.service";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    ProfileService
  ],
})
export class ProfileRoutingModule {
}
