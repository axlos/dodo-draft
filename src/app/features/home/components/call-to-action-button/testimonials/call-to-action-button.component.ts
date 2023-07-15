import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../../../../core/store/actions/auth.actions';

@Component({
  selector: 'app-call-to-action-button',
  templateUrl: './call-to-action-button.component.html',
  styleUrls: ['./call-to-action-button.component.scss'],
})
export class CallToActionButtonComponent {
  constructor(private store: Store) {}

  public signup(): void {
    this.store.dispatch(
      AuthActions.LoginActions.do({
        screenHint: 'signup',
      })
    );
  }
}
