import { RootState } from "../store";
export const twitsSelector = (state: RootState) => state.twits.items;
export const twitsLoadingStatusSelector = (state: RootState) =>
    state.twits.loadingStatus;
