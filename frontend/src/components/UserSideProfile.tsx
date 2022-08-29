import Popover from "@mui/material/Popover";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { userDataSelector } from "../redux/userSlice/selectors";
import { signOut } from "../redux/userSlice/userSlice";

const UserSideProfile = () => {
    const dispatch = useDispatch();
    const userData = useSelector(userDataSelector);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickSignOut = () => {
        handleClose();
        window.localStorage.removeItem("token");
        dispatch(signOut());
    };

    const open = Boolean(anchorEl);

    if (!userData) {
        return null;
    }
    return (
        <div className="userside">
            <button onClick={handleClick}>
                <div className="userside__info">
                    <img src="" alt="avatar" className="avatar" />
                    <div className="userside__info-text">
                        <h3 className="fullname">{userData.fullname}</h3>
                        <p className="username">{userData.username}</p>
                    </div>
                    {open ? (
                        <KeyboardArrowUpIcon className="userside__info-text__arrow" />
                    ) : (
                        <KeyboardArrowDownIcon className="userside__info-text__arrow" />
                    )}
                </div>
            </button>

            <Popover
                className="userside__menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuList>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/user/${userData._id}`}
                    >
                        <MenuItem>Мой профиль</MenuItem>
                    </Link>
                    <MenuItem onClick={onClickSignOut}>Выйти</MenuItem>
                </MenuList>
            </Popover>
        </div>
    );
};

export default UserSideProfile;
