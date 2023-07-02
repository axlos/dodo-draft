import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "@auth0/auth0-angular";

export const LoginActions = createActionGroup({
  source: "Auth Login Actions",
  events: {
    "do": props<{
      screenHint: string
    }>(),
    "success ": props<{
      user: User,
      isAuthenticated: boolean
    }>()
  }
});

export const LogoutActions = createActionGroup({
  source: "Auth Logout Actions",
  events: {
    "do": emptyProps(),
    "success ": emptyProps(),
  }
});

export const UpdateUserActions = createActionGroup({
  source: "Auth Update User Actions",
  events: {
    "verify": emptyProps(),
    "status": props<{
      status: number
    }>()
  }
});
