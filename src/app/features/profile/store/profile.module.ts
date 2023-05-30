import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { profileFeature } from "./profile.feature";
import { ProfileEffects } from "./profile.effects";
import { ProfileService } from "../services/profile.service";

@NgModule({
  imports: [
    StoreModule.forFeature(profileFeature),
    EffectsModule.forFeature([
      ProfileEffects
    ])
  ],
  providers: [
    ProfileService
  ]
})
export class CoreModule {
}
