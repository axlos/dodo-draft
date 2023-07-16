import { Component, Input } from "@angular/core";
import { NbMenuItem } from "@nebular/theme";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

  @Input()
  public user: string | null = null;
  @Input()
  public loading: boolean = false;

  public userMenu: NbMenuItem[] = [];

  constructor(
    private translate: TranslateService
  ) {
    translate.onDefaultLangChange.subscribe(() => {
      this.userMenu = [
        // {
        //   title: 'Buy Credits',
        //   ariaRole: 'credits',
        //   icon: 'credit-card-outline'
        // },
        {
          title: this.translate.instant('auth.logout'),
          ariaRole: 'logout',
          icon: 'log-out-outline'
        },
      ]
    });
  }
}
