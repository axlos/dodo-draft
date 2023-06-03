import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditProfileComponent } from "./containers/edit-profile/edit-profile.component";
import { SetupComponent } from "./containers/setup/setup.component";
import { VerifiedGuard } from "../../core/guards/verified.guard";
import { SetupGuard } from "./guards/setup.guard";

const routes: Routes = [
  {
    path: '',
    component: EditProfileComponent,
    canActivate: [
      VerifiedGuard
    ]
  },
  {
    path: 'setup',
    component: SetupComponent,
    canActivate: [
      SetupGuard
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
