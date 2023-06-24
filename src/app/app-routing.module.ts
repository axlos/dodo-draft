import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedGuard } from "./core/guards/verified.guard";
import { AuthGuard } from "@auth0/auth0-angular";
import { AuthCallbackComponent } from "./features/auth/auth-callback.component";

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
    component: AuthCallbackComponent,
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
  // {
  //   path: '**',
  //   redirectTo: '/'
  // }
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
