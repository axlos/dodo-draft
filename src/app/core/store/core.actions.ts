import { createAction, createActionGroup, props } from '@ngrx/store';

export const uploadFile = createAction(
  '[Core] Upload File',
  props<{ file: File }>()
);

export const uploadFileSuccess = createAction(
  '[Core] Upload File Success',
);

export const uploadFileFailure = createAction(
  '[Core] Upload File Failure',
  props<{ error: any }>()
);
