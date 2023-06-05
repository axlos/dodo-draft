import { createFeature, createSelector } from "@ngrx/store";
import { profileReducer } from "./profile.reducer";

export const profileFeature = createFeature({
  name: 'profile',
  reducer: profileReducer,
  extraSelectors: ({ selectUploaded, selectError }) => (
    {
      selectUploadedError: createSelector(
        selectUploaded,
        selectError,
        (uploaded, error) => {
          if (uploaded && error) {
            return error;
          }
          return null;
        })
    }
  )
});

export const {
  name,
  reducer,
  selectProfileState,
  selectProfile,
  selectLoading,
  selectSaving,
  selectUploaded,
  selectUploading,
  selectUploadedError
} = profileFeature;
