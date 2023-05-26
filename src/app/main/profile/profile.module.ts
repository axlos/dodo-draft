import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ],
  providers: []
})
export class ProfileModule {
}
