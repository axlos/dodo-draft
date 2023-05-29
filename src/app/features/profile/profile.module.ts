import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { featureKey, profileReducer } from "./store/profile.reducer";
import { SharedModule } from "../../shared/shared.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileEffects } from "./store/profile.effects";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
    StoreModule.forFeature(featureKey, profileReducer),
    EffectsModule.forFeature([
      ProfileEffects
    ]),
  ],
  exports: [],
  providers: [
  ]
})
export class ProfileModule {
}
