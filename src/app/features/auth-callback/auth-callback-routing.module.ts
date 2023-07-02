import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthCallbackComponent } from "./auth-callback.component";

const routes: Routes = [
  {
    path: '',
    component: AuthCallbackComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthCallbackRoutingModule {
}
