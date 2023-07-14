import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Profile } from "../../../../core/models/profile.model";
import * as ProfileFeature from "../../../../core/store/features/profile.feature";
import * as ProfileActions from "../../../../core/store/actions/profile.actions";
import { SuggestVariant } from "../../../../core/models/suggest-variant.model";

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public profile$: Observable<Profile | null>;
  public suggesting$: Observable<boolean>;
  public savingVariant$: Observable<boolean>;
  public variants$: Observable<SuggestVariant[]>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(ProfileFeature.selectLoading);
    this.saving$ = this.store.select(ProfileFeature.selectSaving);
    this.profile$ = this.store.select(ProfileFeature.selectProfile);
    this.suggesting$ = this.store.select(ProfileFeature.selectSuggesting);
    this.variants$ = this.store.select(ProfileFeature.selectVariants);
    this.savingVariant$ = this.store.select(ProfileFeature.selectSavingVariant);
  }

  ngOnInit(): void {
  }

  public save(profile: Partial<Profile>): void {
    this.store.dispatch(
      ProfileActions.SaveActions.do({
        profile
      })
    );
  }

  public suggestVariant(content: string): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.do({
        content
      })
    );
  }

  public cancelVariants(): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.cancel()
    );
  }

  public approveVariant(content: string): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.approve({
        content
      })
    );
  }

}
