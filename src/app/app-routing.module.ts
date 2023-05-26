import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('./main/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./main/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'proposal',
    loadChildren: () =>
      import('./main/proposal/proposal.module').then(m => m.ProposalModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
