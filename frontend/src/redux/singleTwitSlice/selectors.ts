import { RootState } from "../store";

export const singleTwitLoadingStatusSelector = (state: RootState) =>
    state.singleTwit.loadingStatus;

export const singleTwitSelector = (state: RootState) => state.singleTwit.twit;
