import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTagModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NgxDropzoneModule } from "ngx-dropzone";
import { HttpClientModule } from "@angular/common/http";
import { ProposalAiComponent } from "./components/proposal/proposal-ai.component";
import { SortPipe } from "./pipes/sort.pipe";

const COMPONENTS: any[] = [
  ProposalAiComponent,
];

const PIPES: any[] = [
  SortPipe
];

const MODULES: any[] = [
  CommonModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  NbActionsModule,
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbCardModule,
  NbAlertModule,
  NbContextMenuModule,
  NbButtonModule,
  NbUserModule,
  NbTagModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbBadgeModule,
  NbTooltipModule,
  NbStepperModule,
  NbSpinnerModule,
  NbToastrModule,
  NgxDropzoneModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...MODULES
  ],
  providers: [
    ...PIPES
  ]
})
export class SharedModule {
}
