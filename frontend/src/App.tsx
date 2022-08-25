import CircularProgress from "@mui/material/CircularProgress";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SignIn, Home } from "./Pages";
import {
    isAuthSelector,
    userLoadingSelector,
} from "./redux/userSlice/selectors";
import { useAppDispatch } from "./redux/store";
import { getMe } from "./redux/userSlice/userSlice";
import { LoadingStatus } from "./redux/twitsSlice/types";

function App() {
    const history = useNavigate();
    const dispatch = useAppDispatch();

    const isAuth = useSelector(isAuthSelector);
    const loadingStatus = useSelector(userLoadingSelector);
    const isReady =
        loadingStatus !== LoadingStatus.NEVER &&
        loadingStatus !== LoadingStatus.LOADING;

    useEffect(() => {
        if (!isAuth && isReady) {
            history("/sign");
        } else {
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
            <Route path="sign" element={<SignIn />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default App;
