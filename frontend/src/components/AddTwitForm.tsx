import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { MouseEventHandler, useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../redux/store";
import { postTwit } from "../redux/twitsSlice/twitsSlice";
import { useSelector } from "react-redux";
import { twitsLoadingStatusSelector } from "../redux/twitsSlice/selectors";
import { LoadingStatus } from "../redux/twitsSlice/types";
import { uploadImage } from "../utils/uploadImage";
import { setLoading } from "../redux/twitsSlice/twitsSlice";

import UploadImages from "./UploadImages";

const MAX_LENGTH = 199;

interface AddTwitFormProps {
    onCloseTweetModal?: () => void;
}
export interface ImageObj {
    file: File;
    blobUrl: string;
}
const AddTwitForm: React.FC<AddTwitFormProps> = ({ onCloseTweetModal }) => {
    const twitLoadingStatus = useSelector(twitsLoadingStatusSelector);
    const dispatch = useAppDispatch();

    const [images, setImages] = useState<ImageObj[]>([]);

    const [text, setText] = useState("");

    const textPercent = Math.round((text.length / MAX_LENGTH) * 100);

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value);
    };

    const onClickAddTwit: MouseEventHandler<HTMLButtonElement> = async () => {
        if (onCloseTweetModal !== undefined) {
            onCloseTweetModal();
        }
        dispatch(setLoading(LoadingStatus.LOADING));
        const urls = [];
        for (let i = 0; i < images.length; i++) {
            const { url } = await uploadImage(images[i].file);
            urls.push(url);
        }

        dispatch(postTwit({ text, images: urls }));

        setImages([]);
        setText("");
    };

    return (
        <div className="mytwit">
            <div className="mytwit__header">
                <img
                    className="avatar"
                    src="https://day.ru/sites/default/files/image/2021-05/илон%20маск_1.jpg"
                    alt="myphoto"
                />
                <textarea
                    value={text}
                    onChange={onChangeText}
                    className="mytwit__header-textarea"
                    placeholder="Что происходит?"
                />
            </div>
            <div className="mytwit__subheader">
                <div className="mytwit__subheader-icons">
                    <UploadImages images={images} setImages={setImages} />
                    {/* <IconButton color="primary">
                        <SentimentSatisfiedAltOutlinedIcon />
                    </IconButton> */}
                </div>
                <div className="mytwit__subheader-right">
                    {text.length ? (
                        <>
                            <p className="mytwit__subheader-right__count">
                                {text.length}
                            </p>
                            <CircularProgress
                                color={textPercent > 100 ? "error" : undefined}
                                variant="determinate"
                                size={20}
                                thickness={4}
                                value={textPercent > 100 ? 100 : textPercent}
                                className="mytwit__subheader-right__progress"
                            />
                            <CircularProgress
                                variant="determinate"
                                style={{ color: "rgba(0, 0, 0, 0.1)" }}
                                size={20}
                                thickness={4}
                                value={100}
                            />
                        </>
                    ) : null}
                    <button
                        onClick={onClickAddTwit}
                        // disabled={textPercent > 100}
                        className={`button mytwit__subheader-button ${
                            textPercent > 100 || textPercent === 0
                                ? "button__disabled"
                                : ""
                        }`}
                    >
                        {twitLoadingStatus === LoadingStatus.LOADING ? (
                            <CircularProgress color="inherit" />
                        ) : (
                            "Твитнуть"
                        )}
                    </button>
                </div>
            </div>

            {twitLoadingStatus === LoadingStatus.POST_TWIT_ERROR && (
                <Alert severity="error">Ошибка при добавлении твита :(</Alert>
            )}
        </div>
    );
};

export default AddTwitForm;
