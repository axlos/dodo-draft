import { HeaderMenu } from "../enums/header-menu.enum";

export interface HeaderMenuInterface {
  readonly id: HeaderMenu;
  readonly title: string;
  readonly icon?: string;
  readonly class?: string;
  readonly router: string;
}
