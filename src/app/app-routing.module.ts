import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'setup',
    loadChildren: () =>
      import('./features/stepper/stepper.module').then(m => m.StepperModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'create-proposal',
    loadChildren: () =>
      import('./features/proposal/create-proposal.module').then(m => m.CreateProposalModule)
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./features/history/history.module').then(m => m.HistoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
