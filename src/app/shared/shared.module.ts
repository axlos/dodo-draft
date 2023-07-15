import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbPopoverModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { ProposalAiComponent } from './components/proposal/proposal-ai.component';
import { CrudButtonsComponent } from './components/crud-buttons/crud-buttons.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { WordCountPipe } from './pipes/word-count.pipe';
import { LazyLoadDirective } from './directives/lazy-load/lazy-load.directive';

const COMPONENTS: any[] = [
  ProposalAiComponent,
  CrudButtonsComponent,
  UserMenuComponent,
];

const PIPES: any[] = [WordCountPipe];

const DIRECTIVES: any[] = [LazyLoadDirective];

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
  NbSelectModule,
  NbPopoverModule,
  NbAccordionModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...PIPES, ...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...PIPES, ...DIRECTIVES, ...MODULES],
  providers: [...PIPES],
})
export class SharedModule {}
