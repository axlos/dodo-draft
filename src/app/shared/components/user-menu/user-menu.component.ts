import { Component, Input } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

  @Input()
  public user: string | null = null;
  @Input()
  public loading: boolean = false;

  public userMenu: NbMenuItem[] = [
    // {
    //   title: 'Buy Credits',
    //   ariaRole: 'credits',
    //   icon: 'credit-card-outline'
    // },
    {
      title: 'Logout',
      ariaRole: 'logout',
      icon: 'log-out-outline'
    },
  ];
}
