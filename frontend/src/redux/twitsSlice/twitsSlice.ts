import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axios } from "../../core/axios";
import { ITwits, Twit, LoadingStatus } from "./types";
// import { RootState } from "../store";

const initialState: ITwits = {
    items: [],
    loadingStatus: LoadingStatus.NEVER,
};

export interface Response<T> {
    status: string;
    data: T;
}

export const postTwit = createAsyncThunk<
    Twit,
    { text: string; images: string[] }
>("twits/postTwit", async (payload) => {
    const URL = "twits/create";

    const { data } = await axios.post<Response<Twit>>(URL, payload);

    return data.data;
});

export const deleteTwit = createAsyncThunk<string, string>(
    "twits/deleteTwit",
    async (payload) => {
        const URL = `twits/${payload}`;
        await axios.delete(URL);
        return payload;
    }
);

export const fetchTwits = createAsyncThunk<Twit[]>(
    "twits/fetchTwits",
    async () => {
        const URL = "/twits";
        const { data } = await axios.get<Response<Twit[]>>(URL);
        return data.data;
    }
);
const twits = createSlice({
    name: "twits",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<LoadingStatus>) => {
            state.loadingStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteTwit.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(deleteTwit.fulfilled, (state, action: any) => {
                state.items = state.items.filter(
                    (item) => item._id !== action.payload
                );
                state.loadingStatus = LoadingStatus.LOADED;
            })
            .addCase(deleteTwit.rejected, (state) => {
                state.loadingStatus = LoadingStatus.ERROR;
            })

            .addCase(fetchTwits.rejected, (state) => {
                state.loadingStatus = LoadingStatus.ERROR;
            })

            .addCase(fetchTwits.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(
                fetchTwits.fulfilled,
                (state, action: PayloadAction<Twit[]>) => {
                    state.loadingStatus = LoadingStatus.LOADED;
                    state.items = action.payload;
                }
            )

            .addCase(postTwit.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })
            .addCase(
                postTwit.fulfilled,
                (state, action: PayloadAction<Twit>) => {
                    state.loadingStatus = LoadingStatus.LOADED;
                    state.items.push(action.payload);
                }
            )
            .addCase(postTwit.rejected, (state) => {
                state.loadingStatus = LoadingStatus.POST_TWIT_ERROR;
            });
    },
});

const { actions, reducer } = twits;
export default reducer;

export const { setLoading } = actions;
