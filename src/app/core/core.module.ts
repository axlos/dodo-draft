import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NbToastrModule } from "@nebular/theme";
import { reducers } from "./store";
import { CoreService } from "./services/core.service";
import { UserService } from "./services/user.service";
import { ProfileService } from "./services/profile.service";
import { AuthService } from "./services/auth.service";
import { CoreEffects } from "./store/effects/core.effects";
import { UserEffects } from "./store/effects/user.effects";
import { ProfileEffects } from "./store/effects/profile.effects";
import { VerifiedGuard } from "./guards/verified.guard";
import { AuthEffects } from "./store/effects/auth.effects";

@NgModule({
  imports: [
    NbToastrModule,
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
      CoreEffects,
      ProfileEffects,
      AuthEffects
    ])
  ],
  providers: [
    CoreService,
    UserService,
    ProfileService,
    VerifiedGuard,
    AuthService
  ]
})
export class CoreModule {
}
