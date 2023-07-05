import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NgOptimizedImage } from "@angular/common";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    NgOptimizedImage
  ],
  exports: [],
  providers: []
})
export class HomeModule {
}
