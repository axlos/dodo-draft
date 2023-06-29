import { createActionGroup, props } from "@ngrx/store";
import { NbMenuItem } from "@nebular/theme";
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
    "load": props<{ menu: NbMenuItem[] }>(),
  }
});
