import { RootState } from "../store";

export const tagsLoadingStatusSelector = (state: RootState) =>
    state.tags.loadingStatus;

export const tagsItemsSelector = (state: RootState) => state.tags.tags;
