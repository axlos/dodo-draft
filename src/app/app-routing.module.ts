import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedGuard } from "./core/guards/verified.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/proposal/create',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(m =>
        m.ProfileModule
      ),
  },
  {
    path: 'proposal',
    loadChildren: () =>
      import('./features/proposal/proposal.module').then(m =>
        m.ProposalModule
      ),
    canActivate: [
      VerifiedGuard
    ]
  },
  {
    path: '**',
    redirectTo: '/profile/setup'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
