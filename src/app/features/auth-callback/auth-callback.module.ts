import { NgModule } from '@angular/core';
import { AuthCallbackRoutingModule } from "./auth-callback-routing.module";

import { AuthCallbackComponent } from "./auth-callback.component";

@NgModule({
  declarations: [
    AuthCallbackComponent
  ],
  imports: [
    AuthCallbackRoutingModule
  ]
})
export class AuthCallbackModule {
}
