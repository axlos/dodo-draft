import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileFormComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: []
})
export class ProfileModule {
}
