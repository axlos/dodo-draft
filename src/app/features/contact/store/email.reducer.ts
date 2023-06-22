import { createReducer, on } from "@ngrx/store";
import { SendEmailActions } from './email.actions';
import { Email } from "../models/email.model";

export interface EmailState {
  email: Email;
  loading: boolean;
  sent: boolean;
}

export const initialState: EmailState = {
  email: null,
  loading: false,
  sent: false,
};

export const emailReducer = createReducer(
  initialState,
  on(SendEmailActions.do, (state, { email }) => (
    {
      ...state,
      email: email,
      loading: true,
      sent: false,
    }
  )),
  on(SendEmailActions.success, state => (
    {
      ...state,
      email: null,
      loading: false,
      sent: true
    }
  )),
  on(SendEmailActions.failure, state => (
    {
      ...state,
      loading: false,
      sent: false
    }
  ))
);
