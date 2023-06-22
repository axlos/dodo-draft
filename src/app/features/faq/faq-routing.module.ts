import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { FaqComponent } from "./faq.component";

const routes: Routes = [
  {
    path: '',
    component: FaqComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FaqRoutingModule {
}
