import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HistoryComponent } from "./containers/history.component";

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HistoryRoutingModule {
}
