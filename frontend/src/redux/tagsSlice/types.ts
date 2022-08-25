export enum TagsLoadingStatus {
    LOADED = "LOADED",
    ERROR = "ERROR",
    LOADING = "LOADING",
}

export interface Tag {
    id: number;
    name: string;
    count: number;
}
export interface ITags {
    tags: Tag[];
    loadingStatus: any;
}
