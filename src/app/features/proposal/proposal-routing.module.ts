import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProposalsComponent } from "./containers/proposal/proposals/proposals.component";
import { HistoryComponent } from "./containers/history/history.component";
import { CreateProposalComponent } from "./containers/proposal/create-proposal/create-proposal.component";

const routes: Routes = [
  {
    path: 'create',
    component: CreateProposalComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: ':id',
    component: ProposalsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProposalRoutingModule {
}
