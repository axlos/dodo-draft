import { Component, Input } from "@angular/core";
import { User } from "@auth0/auth0-spa-js";
import { NbMenuItem } from "@nebular/theme";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  @Input()
  public user: User | null = null;
  @Input()
  public loading: boolean = false;

  public userMenu: NbMenuItem[] = [
    {
      title: 'Buy Credits',
      ariaRole: 'credits',
      icon: 'credit-card-outline'
    },
    {
      title: 'Logout',
      ariaRole: 'logout',
      icon: 'log-out-outline'
    },
  ];
}
