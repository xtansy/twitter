import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LoadingStatus, Twit } from "../redux/twitsSlice/types";
import {
    twitsSelector,
    twitsLoadingStatusSelector,
} from "../redux/twitsSlice/selectors";

import TwitBlock from "./TwitBlock";
import { useAppDispatch } from "../redux/store";
import { fetchTwits } from "../redux/twitsSlice/twitsSlice";

const Twits = () => {
    const dispatch = useAppDispatch();

    const tweets = useSelector(twitsSelector);

    const tweetsLoadingStatus = useSelector(twitsLoadingStatusSelector);

    useEffect(() => {
        dispatch(fetchTwits());
    }, []);

    if (tweetsLoadingStatus === LoadingStatus.LOADING) {
        return (
            <div className="home__content-twits__loading">
                <CircularProgress />
            </div>
        );
    }
    if (tweetsLoadingStatus === LoadingStatus.ERROR) {
        return <Alert severity="error">Ошибка при загрузке твитов!</Alert>;
    }

    return (
        <>
            {[...tweets].reverse().map((item: Twit) => {
                return (
                    <Link
                        key={item._id}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                        to={`/home/tweets/${item._id}`}
                    >
                        <TwitBlock
                            images={item.images}
                            createdAt={item.createdAt}
                            text={item.text}
                            _id={item._id}
                            user={{
                                fullname: item.user.fullname,
                                username: item.user.username,
                                avatarUrl: item.user.avatarUrl,
                                _id: item.user._id,
                            }}
                        />
                    </Link>
                );
            })}
        </>
    );
};

export default Twits;
