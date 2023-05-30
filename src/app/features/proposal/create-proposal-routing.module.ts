import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateProposalComponent } from "./containers/create-proposal.component";

const routes: Routes = [
  {
    path: '',
    component: CreateProposalComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CreateProposalRoutingModule {
}
