import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateProposalComponent } from "./containers/create-proposal/create-proposal.component";
import { HistoryComponent } from "./containers/history/history.component";

const routes: Routes = [
  {
    path: 'create',
    component: CreateProposalComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProposalRoutingModule {
}
