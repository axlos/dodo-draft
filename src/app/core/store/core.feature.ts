import { createFeature, createSelector } from "@ngrx/store";
import { coreReducer } from "./core.reducer";

export const coreFeature = createFeature({
  name: 'core',
  reducer: coreReducer,
  extraSelectors: ({ selectUploaded, selectError})=> ({
    selectUploadedError: createSelector(
      selectUploaded,
      selectError,
      (uploaded, error) => {
        if (uploaded && error) {
          return error;
        }
        return null;
      })
  })
});

export const {
  name,
  reducer,
  selectCoreState,
  selectUploaded,
  selectError,
  selectUploading,
  selectUploadedError
} = coreFeature;
