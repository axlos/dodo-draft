import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

  constructor(private store: Store) {}

}
