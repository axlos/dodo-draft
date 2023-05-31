import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditProfileComponent } from "./containers/edit-profile/edit-profile.component";
import { SetupComponent } from "./containers/setup/setup.component";
import { ProfileGuard } from "./guards/profile.guard";

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent
  },
  {
    path: 'setup',
    component: SetupComponent,
    canActivate: [
      ProfileGuard
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProfileRoutingModule {
}
