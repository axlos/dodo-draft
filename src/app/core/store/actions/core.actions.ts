import { createActionGroup, props } from "@ngrx/store";
import { HeaderMenuModel } from "../../models/header-menu.model";

export const HeaderMenuActions = createActionGroup({
  source: "Header Menu",
  events: {
    "load": props<{ menu: HeaderMenuModel[] }>(),
  }
});
