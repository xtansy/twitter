import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TweetLoadingStatus, ISingleTwit } from "./types";
import { Twit } from "../twitsSlice/types";

// import { RootState } from "../store";
import { Response } from "../twitsSlice/twitsSlice";

const initialState: ISingleTwit = {
    twit: {
        _id: "0",
        text: "",
        createdAt: "00000",
        user: {
            fullname: "",
            username: "",
            avatarUrl: "",
            _id: "",
        },
    },
    loadingStatus: TweetLoadingStatus.NEVER,
};
export const fetchSingleTwit = createAsyncThunk<Twit, string>(
    "singleTwit/fetchSingleTwit",
    async (action) => {
        const URL = `/twits/${action}`;
        const { data } = await axios.get<Response<Twit>>(URL);
        return data.data;
    }
);
const singleTwit = createSlice({
    name: "singleTwit",
    initialState,
    reducers: {
        clearTwit: (state) => {
            state.twit = {
                _id: "1000",
                createdAt: "00000",

                text: "",
                user: {
                    fullname: "",
                    username: "",
                    avatarUrl: "",
                    _id: "",
                },
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleTwit.pending, (state) => {
                state.loadingStatus = TweetLoadingStatus.LOADING;
            })
            .addCase(
                fetchSingleTwit.fulfilled,
                (state, action: PayloadAction<Twit>) => {
                    state.loadingStatus = TweetLoadingStatus.LOADED;
                    state.twit = action.payload;
                }
            );
    },
});

const { actions, reducer } = singleTwit;
export default reducer;

export const { clearTwit } = actions;
