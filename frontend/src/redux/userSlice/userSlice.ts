import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoadingStatus } from "../twitsSlice/types";
import { IUser, User, UserInfo } from "./types";
import { LoginProps } from "../../Pages/SignIn/SignInModal";
import { axios } from "../../core/axios";
import { Response } from "../twitsSlice/twitsSlice";
import { RegisterProps } from "../../Pages/SignIn/SignUpModal";

const initialState: IUser = {
    data: null,
    loadingStatus: LoadingStatus.NEVER,
};

export const fetchLoginUser = createAsyncThunk<User, LoginProps>(
    "user/fetchLoginUser",
    async (payload) => {
        const URL = "/auth/login";
        const { data } = await axios.post<Response<User>>(URL, payload);

        if (data.data.token) {
            window.localStorage.setItem("token", data.data.token);
        }

        return data.data;
    }
);

export const fetchRegisterUser = createAsyncThunk<User, RegisterProps>(
    "user/fetchRegisterUser",
    async (payload) => {
        const URL = "/auth/register";
        const { data } = await axios.post<Response<User>>(URL, payload);
        return data.data;
    }
);
export const getMe = createAsyncThunk<User>("user/getMe", async () => {
    const URL = "/users/me";
    const { data } = await axios.get<Response<User>>(URL);
    return data.data;
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchRegisterUser.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })

            .addCase(fetchRegisterUser.fulfilled, (state) => {
                state.loadingStatus = LoadingStatus.SUCCES_REGISTER;
            })

            .addCase(fetchRegisterUser.rejected, (state) => {
                state.loadingStatus = LoadingStatus.ERROR_REGISTER;
            })

            .addCase(fetchLoginUser.rejected, (state) => {
                state.loadingStatus = LoadingStatus.ERROR;
            })

            .addCase(fetchLoginUser.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })

            .addCase(fetchLoginUser.fulfilled, (state, action) => {
                state.loadingStatus = LoadingStatus.LOADED;
                state.data = action.payload;
            })

            .addCase(getMe.rejected, (state) => {
                state.loadingStatus = LoadingStatus.ERROR;
            })

            .addCase(getMe.pending, (state) => {
                state.loadingStatus = LoadingStatus.LOADING;
            })

            .addCase(getMe.fulfilled, (state, action) => {
                state.loadingStatus = LoadingStatus.LOADED;
                state.data = action.payload;
            });
    },
});

const { actions, reducer } = userSlice;
export default reducer;

export const { signOut } = actions;
