import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgOptimizedImage } from '@angular/common';

import { FeaturesSupportedComponent } from './components/features-supported/features-supported.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FinalCtaComponent } from './components/final-cta/final-cta.component';
import { CallToActionButtonComponent } from './components/call-to-action-button/testimonials/call-to-action-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    FeaturesSupportedComponent,
    TestimonialsComponent,
    FinalCtaComponent,
    CallToActionButtonComponent,
  ],
  imports: [HomeRoutingModule, SharedModule, NgOptimizedImage],
  exports: [],
  providers: [],
})
export class HomeModule {}
