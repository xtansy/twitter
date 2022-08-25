import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useSelector } from "react-redux";

import { formatDate } from "../utils/formatDate";
import ImageList from "./ImageList";
import { userDataSelector } from "../redux/userSlice/selectors";
import { deleteTwit } from "../redux/twitsSlice/twitsSlice";
import { useAppDispatch } from "../redux/store";

interface TwitProps {
    text: string;
    _id: string;
    createdAt: string;
    images?: string[];
    user: {
        fullname: string;
        username: string;
        avatarUrl: string;
        _id: string;
    };
}

const ITEM_HEIGHT = 48;

const TwitBlock: React.FC<TwitProps> = ({
    user,
    text,
    createdAt,
    images,
    _id,
}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const authUser = useSelector(userDataSelector);
    const isAuthUserTwit = authUser?._id === user._id;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const onClickDeleteTwit = (event: React.MouseEvent<HTMLElement>) => {
        handleClose(event);
        dispatch(deleteTwit(_id));
    };
    return (
        <div className="twit">
            <div className="twit__info">
                <div className="twit__info-block">
                    <img className="avatar" src={user.avatarUrl} alt="logo" />
                    <h3 className="twit__fullname fullname">{user.fullname}</h3>
                    <p className="twit__username username">{user.username}</p>
                    <span>•</span>
                    <p className="twit__date">
                        {formatDate(new Date(createdAt))}
                    </p>
                </div>

                {isAuthUserTwit && (
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                )}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                        },
                    }}
                >
                    <MenuItem key={"Редактировать"} onClick={() => {}}>
                        {"Редактировать"}
                    </MenuItem>
                    <MenuItem key={"Удалить"} onClick={onClickDeleteTwit}>
                        {"Удалить"}
                    </MenuItem>
                </Menu>
            </div>
            <p className="twit__text">{text}</p>
            {images && (
                <ImageList images={images} onClickDeleteImage={() => {}} />
            )}

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

export default TwitBlock;
