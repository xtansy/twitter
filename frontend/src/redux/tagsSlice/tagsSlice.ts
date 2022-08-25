import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Tag, ITags, TagsLoadingStatus } from "./types";

import { RootState } from "../store";

const initialState: ITags = {
    tags: [],
    loadingStatus: TagsLoadingStatus.LOADING,
};
export const fetchTags = createAsyncThunk<Tag[]>("tags/fetchTags", async () => {
    const URL = "/tags";
    const { data } = await axios.get(URL);
    return data;
});
const tags = createSlice({
    name: "tags",
    initialState,
    reducers: {
        // changePaginateCount: (state, action: PayloadAction<number>) => {
        //     state.paginateCount = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.loadingStatus = TagsLoadingStatus.LOADING;
            })
            .addCase(
                fetchTags.fulfilled,
                (state, action: PayloadAction<Tag[]>) => {
                    state.loadingStatus = TagsLoadingStatus.LOADED;
                    state.tags = action.payload;
                }
            );
    },
});

const { actions, reducer } = tags;
export default reducer;

// export const { changePaginateCount } = actions;

// export { allGamesSelector };
