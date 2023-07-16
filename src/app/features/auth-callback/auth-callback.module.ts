import { NgModule } from '@angular/core';
import { AuthCallbackRoutingModule } from "./auth-callback-routing.module";

import { AuthCallbackComponent } from "./auth-callback.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    AuthCallbackComponent
  ],
  imports: [
    AuthCallbackRoutingModule,
    SharedModule
  ]
})
export class AuthCallbackModule {
}
