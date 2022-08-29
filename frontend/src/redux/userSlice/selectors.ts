import { RootState } from "../store";

export const userDataSelector = (state: RootState) => state.user.data;
export const userLoadingSelector = (state: RootState) =>
    state.user.loadingStatus;

export const isAuthSelector = (state: RootState): boolean =>
    !!userDataSelector(state);

export const userIdSelector = (state: RootState): string | undefined =>
    state.user.data?._id;
