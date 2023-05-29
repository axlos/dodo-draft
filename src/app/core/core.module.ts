import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CoreService } from "./services/core.service";
import { CoreEffects } from "./store/core.effects";
import { coreFeature } from "./store/core.feature";

@NgModule({
  imports: [
    StoreModule.forFeature(coreFeature),
    EffectsModule.forFeature([
      CoreEffects
    ])
  ],
  providers: [
    CoreService
  ]
})
export class CoreModule {
}
