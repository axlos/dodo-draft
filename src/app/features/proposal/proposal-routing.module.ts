import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProposalComponent } from "./containers/proposal/proposal.component";
import { HistoryComponent } from "./containers/history/history.component";

const routes: Routes = [
  {
    path: 'create',
    component: ProposalComponent,
  },
  {
    path: ':id',
    component: ProposalComponent,
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
