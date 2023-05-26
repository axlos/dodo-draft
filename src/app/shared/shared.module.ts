import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbAlertModule,
  NbCardModule, NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbThemeModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

const COMPONENTS: any[] = [];

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
