import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as ProfileFeature from "../../store/profile/profile.feature";
import { Profile } from "../../models/profile.model";
import * as ProfileActions from "../../store/profile/profile.actions";

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public profile$: Observable<Profile | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(ProfileFeature.selectLoading);
    this.saving$ = this.store.select(ProfileFeature.selectSaving);
    this.profile$ = this.store.select(ProfileFeature.selectProfile);
  }

  ngOnInit(): void {
    this.store.dispatch(
      ProfileActions.LoadActions.do()
    );
  }

  public save(profile: Partial<Profile>) {
    this.store.dispatch(
      ProfileActions.SaveActions.do({
        profile
      })
    );
  }
}
