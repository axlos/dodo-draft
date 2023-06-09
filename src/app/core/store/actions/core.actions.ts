import { createActionGroup, props } from "@ngrx/store";
import { HeaderMenuInterface } from "../../interfaces/header-menu.interface";
import { MessageConfig } from "../../interfaces/message-config.interface";

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
    "load": props<{ menu: HeaderMenuInterface[] }>(),
  }
});
