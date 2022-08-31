export enum LoadingStatus {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",
    POST_TWIT_ERROR = "POST_TWIT_ERROR",
    SUCCES_REGISTER = "SUCCES_REGISTER",
    ERROR_REGISTER = "ERROR_REGISTER",
}
export interface Twit {
    _id: string;
    text: string;
    createdAt: string;
    images?: string[];
    user: {
        fullname: string;
        username: string;
        avatarUrl: string;
        _id: string;
    };
}

export interface ITwits {
    items: Twit[];
    loadingStatus: LoadingStatus;
}
