import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { environment } from "../environments/environment";
import {
  NbDialogModule,
  NbGlobalPhysicalPosition,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule
} from "@nebular/theme";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot({
      hasBackdrop: true,
      autoFocus: true
    }),
    NbThemeModule.forRoot({
      name: 'default'
    }),
    NbToastrModule.forRoot({
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
