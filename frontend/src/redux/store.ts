import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import twits from "./twitsSlice/twitsSlice";
import tags from "./tagsSlice/tagsSlice";
import singleTwit from "./singleTwitSlice/singleTwitSlice";

import user from "./userSlice/userSlice";

const store = configureStore({
    reducer: { twits, tags, singleTwit, user },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type State = typeof store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
