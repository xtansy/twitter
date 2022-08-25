import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import IconButton from "@mui/material/IconButton";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";

import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import {
    AddTwitForm,
    ModalBlock,
    Tags,
    BackButton,
    SingleTweet,
    Twits,
} from "../components";

const Home = () => {
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
                        to="home"
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
                            <p>Профиль</p>
                        </li>
                    </ul>
                    <button
                        onClick={onOpenTweetModal}
                        className="button home__menu-button"
                    >
                        Твитнуть
                    </button>
                </div>

                <div className="home__content">
                    <div className="home__content-header">
                        {/* стрелка назад */}
                        <Routes>
                            <Route
                                path={"home/:any/*"}
                                element={<BackButton />}
                            ></Route>
                        </Routes>
                        {/* ------ */}

                        {/* заголовок */}
                        <Routes>
                            <Route
                                path={"home/tweets/:id"}
                                element={
                                    <>
                                        <h1 className="home__content-title">
                                            Твитнуть
                                        </h1>
                                    </>
                                }
                            ></Route>
                            {["home", "/home/search"].map((path, i) => {
                                return (
                                    <Route
                                        key={i}
                                        path={path}
                                        element={
                                            <>
                                                <h1 className="home__content-title">
                                                    Твиты
                                                </h1>
                                            </>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                        {/* ------ */}
                    </div>

                    {/* форма твита */}
                    <Routes>
                        {["home", "/home/search"].map((path, i) => {
                            return (
                                <Route
                                    key={i}
                                    path={path}
                                    element={<AddTwitForm />}
                                />
                            );
                        })}
                    </Routes>
                    {/* ------- */}

                    <div className="home__content-twits">
                        <Routes>
                            <Route path="home" element={<Twits />} />
                            <Route
                                path="home/tweets/:id"
                                element={<SingleTweet />}
                            />
                        </Routes>
                    </div>
                </div>

                <div className="home__search">
                    <input
                        placeholder="Поиск по Twitter"
                        type="text"
                        className="input home__search-input"
                    />
                    <div className="home__search-actual">
                        <h2 className="home__search-actual__title">
                            Актуальные темы
                        </h2>
                        <Tags />
                    </div>

                    <div className="home__search-read">
                        <h2 className="home__search-read__title">
                            Кого читать
                        </h2>
                        <div className="home__search-read__profile">
                            <img
                                className="avatar"
                                src="https://day.ru/sites/default/files/image/2021-05/илон%20маск_1.jpg"
                                alt="ava"
                            />
                            <div className="home__search-read__profile-info">
                                <h3 className="fullname">Dock Of Shame</h3>
                                <p className="username">@FavDockOfShame</p>
                            </div>
                            <IconButton color="primary">
                                <PersonAddOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
