import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CoreService } from "./services/core.service";
import { CoreEffects } from "./store/effects/core.effects";
import { UserService } from "./services/user.service";
import { UserEffects } from "./store/effects/user.effects";
import { reducers } from "./store";

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([
      UserEffects,
      CoreEffects
    ])
  ],
  providers: [
    CoreService,
    UserService
  ]
})
export class CoreModule {
}
