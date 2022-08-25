import { LoadingStatus } from "../twitsSlice/types";

export interface UserInfo {
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    confirmed?: boolean;
    location?: string;
    about?: string;
    website?: string;
}

export interface User extends UserInfo {
    password: string;
    confirmHash: string;
    token?: string;
}
export interface IUser {
    data: User | null;
    loadingStatus: LoadingStatus;
}
