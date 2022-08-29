import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useState } from "react";
import { userIdSelector } from "../redux/userSlice/selectors";

import {
    AddTwitForm,
    ModalBlock,
    Tags,
    UserList,
    UserSideProfile,
} from "../components";

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    const userId = useSelector(userIdSelector);
    const [visibleTweetModal, setVisibleTweetModal] = useState(false);

    const onOpenTweetModal = () => {
        setVisibleTweetModal(true);
    };

    const onCloseTweetModal = () => {
        setVisibleTweetModal(false);
    };

    return (
        <>
            <ModalBlock
                title="Новый твит"
                visible={visibleTweetModal}
                onClose={onCloseTweetModal}
            >
                <AddTwitForm onCloseTweetModal={onCloseTweetModal} />
            </ModalBlock>
            <div className="home _container ">
                <div className="home__menu">
                    <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to="/home"
                    >
                        <IconButton color="primary" className="home__menu-logo">
                            <TwitterIcon />
                        </IconButton>
                    </Link>

                    <ul className="home__menu-ul">
                        <li>
                            <IconButton color={"inherit"}>
                                <SearchIcon />
                            </IconButton>
                            <p>Поиск</p>
                        </li>
                        <li>
                            <IconButton color={"inherit"}>
                                <NotificationsOutlinedIcon />
                            </IconButton>
                            <p>Уведомления</p>
                        </li>
                        <li>
                            <IconButton color={"inherit"}>
                                <EmailOutlinedIcon />
                            </IconButton>
                            <p>Сообщения</p>
                        </li>
                        <li>
                            <IconButton color={"inherit"}>
                                <BookmarksOutlinedIcon />
                            </IconButton>
                            <p>Закладки</p>
                        </li>
                        <li>
                            <IconButton color={"inherit"}>
                                <ListAltIcon />
                            </IconButton>
                            <p>Список</p>
                        </li>
                        <li>
                            <IconButton color={"inherit"}>
                                <PermIdentityIcon />
                            </IconButton>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                                to={`/user/${userId}`}
                            >
                                <p>Профиль</p>
                            </Link>
                        </li>
                    </ul>
                    <button
                        onClick={onOpenTweetModal}
                        className="button home__menu-button"
                    >
                        Твитнуть
                    </button>

                    <UserSideProfile />
                </div>

                <div className="home__content">{children}</div>

                <div className="home__search">
                    <input
                        placeholder="Поиск по Twitter"
                        type="text"
                        className="input home__search-input"
                    />
                    {/* <div className="home__search-actual">
                        <h2 className="home__search-actual__title">
                            Актуальные темы
                        </h2>
                        <Tags />
                    </div> */}

                    <UserList />
                </div>
            </div>
        </>
    );
};

export default HomeLayout;
