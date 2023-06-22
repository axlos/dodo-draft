import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { ViewportScroller } from "@angular/common";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SendEmailActions } from "./store/email.actions";
import { emailFeature } from "./store/email.feature";
import { Observable } from "rxjs";
import * as CoreActions from "../../core/store/actions/core.actions";
import { UnexpectedErrorMessage } from "../../core/interfaces/message-config.interface";

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  public formContact: FormGroup;
  public loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.loading$ = this.store.select(emailFeature.selectLoading);

    this.store.select(emailFeature.selectSent).pipe(
      filter(sent =>
        sent === true
      ),
    ).subscribe(() => {
      this.formContact.reset();
      this.store.dispatch(
        CoreActions.UIActions.displaymessage({
          params: {
            message: 'Email sent, thanks for contacting us!',
            title: 'Email sent',
            config: {
              status: 'basic',
            }
          }
        })
      );
    })

    // create a form build with name required, email required, and message required
    this.formContact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.router.events.pipe(
      filter(event =>
        event instanceof NavigationEnd
      ),
      filter(() =>
        !!this.route.snapshot.fragment
      )
    ).subscribe(() => {
      this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
    });
  }

  public submit(): void {
    this.store.dispatch(
      SendEmailActions.do({
        email: this.formContact.value
      })
    );
  }

}
