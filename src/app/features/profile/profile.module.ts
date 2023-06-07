import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SetupGuard } from "./guards/setup.guard";
import { SharedModule } from "../../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { stepNavigationFeature } from "./store/step-navigation/step-navigation.feature";
import { StepNavigationEffects } from "./store/step-navigation/step-navigation.effects";
import { EditProfileComponent } from "./containers/edit-profile/edit-profile.component";
import { SetupComponent } from "./containers/setup/setup.component";
import { UploadProfileComponent } from "./components/upload-profile/upload-profile.component";
import { DropzoneComponent } from "./components/dropzone/dropzone.component";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { ExperienceDialogComponent } from "./components/experience-dialog/experience-dialog.component";
import { EducationDialogComponent } from "./components/education-dialog/education-dialog.component";
import { CertificationDialogComponent } from "./components/certification-dialog/certification-dialog.component";
import { LanguageDialogComponent } from "./components/language-dialog/language-dialog.component";

@NgModule({
  declarations: [
    EditProfileComponent,
    SetupComponent,
    UploadProfileComponent,
    DropzoneComponent,
    ProfileFormComponent,
    ExperienceDialogComponent,
    EducationDialogComponent,
    CertificationDialogComponent,
    LanguageDialogComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule,
    EffectsModule.forFeature([
      StepNavigationEffects
    ]),
    StoreModule.forFeature(stepNavigationFeature)
  ],
  exports: [],
  providers: [
    SetupGuard
  ]
})
export class ProfileModule {
}
