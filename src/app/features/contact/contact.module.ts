import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { SharedModule } from "../../shared/shared.module";
import { ContactRoutingModule } from "./contact-routing.module";
import { ContactComponent } from "./contact.component";
import { EmailEffects } from "./store/email.effects";
import { emailFeature } from "./store/email.feature";
import { EmailService } from "./services/email.service";

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    ContactRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      EmailEffects
    ]),
    StoreModule.forFeature(emailFeature),
  ],
  exports: [],
  providers: [
    EmailService
  ]
})
export class ContactModule {
}
