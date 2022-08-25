import { Twit } from "../twitsSlice/types";
export enum TweetLoadingStatus {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
}
export interface ISingleTwit {
    twit: Twit;
    loadingStatus: TweetLoadingStatus;
}
