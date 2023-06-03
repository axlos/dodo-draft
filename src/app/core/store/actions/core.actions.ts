import { createActionGroup, props } from "@ngrx/store";
import { HeaderMenuModel } from "../../models/header-menu.model";
import { MessageConfig } from "../../models/message-config.model";

export const UIActions = createActionGroup({
  source: "UI Actions",
  events: {
    "displayMessage": props<{
      params: MessageConfig
    }>(),
  }
});

export const HeaderMenuActions = createActionGroup({
  source: "Header Menu",
  events: {
    "load": props<{ menu: HeaderMenuModel[] }>(),
  }
});
