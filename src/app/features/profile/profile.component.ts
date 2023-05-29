import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private store: Store) {}

}
