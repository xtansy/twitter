import CircularProgress from "@mui/material/CircularProgress";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

import { SingleTwitPage, SignIn, Home, User } from "./Pages";

import {
    isAuthSelector,
    userLoadingSelector,
} from "./redux/userSlice/selectors";
import { useAppDispatch } from "./redux/store";
import { getMe } from "./redux/userSlice/userSlice";
import { LoadingStatus } from "./redux/twitsSlice/types";

// TODO:

function App() {
    const history = useNavigate();

    const location = useLocation();
    const dispatch = useAppDispatch();

    const isAuth = useSelector(isAuthSelector);
    const loadingStatus = useSelector(userLoadingSelector);

    const isReady =
        loadingStatus !== LoadingStatus.NEVER &&
        loadingStatus !== LoadingStatus.LOADING;

    useEffect(() => {
        if (!isAuth && isReady) {
            history("/sign");
        } else if (!location.pathname.split("/").includes("user")) {
            history("/home");
        }
    }, [isAuth, isReady]);

    useEffect(() => {
        dispatch(getMe());
    }, []);

    if (!isReady) {
        return (
            <div className="home__centered-loading-block">
                <CircularProgress />
            </div>
        );
    }
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/tweets/:id" element={<SingleTwitPage />} />

            <Route path="/user/:id" element={<User />} />
            <Route path="/sign" element={<SignIn />} />
        </Routes>
    );
}

export default App;
