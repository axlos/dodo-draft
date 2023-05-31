import { Component, Input } from "@angular/core";
import { Profile } from "../../models/profile.model";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {

  @Input()
  public profile: Profile | null = null;

  @Input()
  public loading: boolean = false;

}
