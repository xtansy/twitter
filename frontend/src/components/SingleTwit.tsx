import CircularProgress from "@mui/material/CircularProgress";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ruLang from "date-fns/locale/ru";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { TweetLoadingStatus } from "../redux/singleTwitSlice/types";
import {
    fetchSingleTwit,
    clearTwit,
} from "../redux/singleTwitSlice/singleTwitSlice";
import { useAppDispatch } from "../redux/store";
import {
    singleTwitLoadingStatusSelector,
    singleTwitSelector,
} from "../redux/singleTwitSlice/selectors";

import format from "date-fns/format";
import ImageList from "./ImageList";

const SingleTweet = () => {
    const twit = useSelector(singleTwitSelector);
    const loadingStatus = useSelector(singleTwitLoadingStatusSelector);

    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(fetchSingleTwit(id));
        }

        return () => {
            dispatch(clearTwit());
        };
    }, [id]);

    if (loadingStatus === TweetLoadingStatus.LOADING) {
        return (
            <div className="home__content-twits__loading">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="fulltwit">
            <div className="fulltwit__info">
                <img
                    className="avatar"
                    src="https://mobile.twitter.com/ivveva"
                    alt="logo"
                />
                <div className="fulltwit__info-text">
                    <h3 className="fulltwit__fullname fullname">
                        {twit.user.fullname}
                    </h3>
                    <p className="fulltwit__username username">
                        {twit.user.username}
                    </p>
                </div>
            </div>
            <p className="fulltwit__text">{twit.text}</p>
            {twit.images && (
                <ImageList images={twit.images} onClickDeleteImage={() => {}} />
            )}
            <div className="twit__date">
                {format(new Date(twit.createdAt), "H:mm", { locale: ruLang })} •{" "}
                {format(new Date(twit.createdAt), "dd MMM. yyyy г.", {
                    locale: ruLang,
                })}
            </div>
            <div className="twit__icons">
                <IconButton color="primary">
                    <ChatBubbleOutlineOutlinedIcon />
                </IconButton>
                <IconButton color="primary">
                    <RepeatOutlinedIcon />
                </IconButton>
                <IconButton color="primary">
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
                <IconButton color="primary">
                    <ReplyOutlinedIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default SingleTweet;
