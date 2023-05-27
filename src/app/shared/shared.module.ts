import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule, NbTagModule,
  NbThemeModule, NbToggleModule, NbUserModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NgxDropzoneModule } from "ngx-dropzone";

import { DropzoneComponent } from "./components/dropzone/dropzone.component";
import { ProposalAiComponent } from "./components/proposal/proposal-ai.component";

const COMPONENTS: any[] = [
  DropzoneComponent,
  ProposalAiComponent
];

const PIPES: any[] = [];

const MODULES: any[] = [
  CommonModule,
  RouterModule,
  FormsModule,
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
  NgxDropzoneModule,
  NbMenuModule.forRoot(),
  NbThemeModule.forRoot({
    name: 'default'
  }),
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
