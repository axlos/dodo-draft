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
  NbContextMenuModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbSelectModule, NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NgxDropzoneModule } from "ngx-dropzone";
import { HttpClientModule } from "@angular/common/http";
import { ProposalAiComponent } from "./components/proposal/proposal-ai.component";
import { CrudButtonsComponent } from "./components/crud-buttons/crud-buttons.component";

const COMPONENTS: any[] = [
  ProposalAiComponent,
  CrudButtonsComponent
];

const PIPES: any[] = [
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
  NgxDropzoneModule,
  NbSidebarModule,
  NbFormFieldModule,
  NbSelectModule
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
