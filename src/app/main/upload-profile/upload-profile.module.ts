import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { UploadProfileRoutingModule } from "./upload-profile-routing.module";
import { NgxDropzoneModule } from "ngx-dropzone";
import { UploadProfileComponent } from "./upload-profile.component";

@NgModule({
  declarations: [
    UploadProfileComponent
  ],
  imports: [
    UploadProfileRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ],
  providers: []
})
export class UploadProfileModule {
}
