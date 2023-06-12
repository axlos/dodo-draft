import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User as Auth0User } from "@auth0/auth0-spa-js";

export const LoginActions = createActionGroup({
  source: "Auth Login Actions",
  events: {
    "do": emptyProps(),
    "success ": props<{
      user: Auth0User,
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
    "setupProfile": props<{
      status: number
    }>()
  }
});
