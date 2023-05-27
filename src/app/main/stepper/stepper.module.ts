import { NgModule } from '@angular/core';

import { SharedModule } from "../../shared/shared.module";
import { StepperRoutingModule } from "./stepper-routing.module";
import { StepperComponent } from "./stepper.component";
import { UploadProfileComponent } from "./upload-profile/upload-profile.component";

@NgModule({
  declarations: [
    StepperComponent,
    UploadProfileComponent
  ],
  imports: [
    StepperRoutingModule,
    SharedModule
  ],
  providers: []
})
export class StepperModule {
}
