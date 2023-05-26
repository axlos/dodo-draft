import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProposalComponent } from "./proposal.component";

const routes: Routes = [
  {
    path: '',
    component: ProposalComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
})
export class ProposalRoutingModule {
}
