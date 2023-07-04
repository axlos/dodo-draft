import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "@auth0/auth0-angular";

import { VerifiedGuard } from "./core/guards/verified.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m =>
        m.HomeModule
      )
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./features/faq/faq.module').then(m =>
        m.FaqModule
      )
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.module').then(m =>
        m.ContactModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(m =>
        m.ProfileModule
      ),
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('./features/auth-callback/auth-callback.module').then(m =>
        m.AuthCallbackModule
      )
  },
  {
    path: 'proposal',
    loadChildren: () =>
      import('./features/proposal/proposal.module').then(m =>
        m.ProposalModule
      ),
    canActivate: [
      AuthGuard,
      VerifiedGuard
    ]
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
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
