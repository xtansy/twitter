import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LinkIcon from "@mui/icons-material/Link";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { HomeLayout } from "../layouts";
import { BackButton, TwitBlock } from "../components";
import { axios } from "../core/axios";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserInfo } from "../redux/userSlice/types";
import { Twit } from "../redux/twitsSlice/types";

const User = () => {
    const [userData, setUser] = useState<{
        status: string;
        data: UserInfo;
        twits: Twit[];
    } | null>(null);

    const userId = useLocation().pathname.split("/").pop();

    const [value, setValue] = useState(0);

    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/users/${userId}`);
                setUser(data);
            } catch (e) {
                alert("Данный пользователь не найден, иди нах отсюда");
            }
        };
        fetchUser();
    }, [userId]);

    if (!userData) {
        return null;
    }

    return (
        <HomeLayout>
            <div className="user">
                <div className="user__header">
                    <BackButton />
                    <div className="user__header-info">
                        <h3 className="fullname">{userData.data.fullname}</h3>
                        <p className="subtitle">
                            {userData.twits.length} твита
                        </p>
                    </div>
                </div>

                <div className="user__imageblock"></div>

                <div className="user__profile">
                    <div className="user__profile-header">
                        <img
                            className="avatar avatar_user-page"
                            src="https://day.ru/sites/default/files/image/2021-05/илон%20маск_1.jpg"
                            alt=""
                        />
                        <button className="button">Изменить профиль</button>
                    </div>

                    <div className="user__profile-info">
                        <h2 className="fullname">{userData.data.fullname}</h2>
                        <p className="username">@{userData.data.username}</p>
                    </div>

                    <h4 className="user__profile-descr">
                        Frontend Developer / UI Designer / JavaScript
                    </h4>

                    <div className="user__profile-moreinfo">
                        <div className="user__profile-moreinfo__block">
                            <CakeOutlinedIcon />
                            <p className="subtitle">Moscow, Russia</p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <LinkIcon />
                            <p className="subtitle">mysite.com</p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <PlaceOutlinedIcon />
                            <p className="subtitle">
                                Дата рождения: 24 октября 1996 г.
                            </p>
                        </div>

                        <div className="user__profile-moreinfo__block">
                            <CalendarMonthOutlinedIcon />
                            <p className="subtitle">
                                Регистрация: ноябрь 2016 г.
                            </p>
                        </div>
                    </div>

                    <div className="user__profile-subs">
                        <p className="subtitle">
                            <span>213</span> в читаемых
                        </p>
                        <p className="subtitle">
                            <span>59</span> читателей
                        </p>
                    </div>
                </div>

                <div className="user__tabs">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Твиты" />
                        <Tab label="Твиты и ответы" />
                        <Tab label="Медиа" />
                        <Tab label="Нравится" />
                    </Tabs>
                </div>
                <>
                    {[...userData.twits].reverse().map((item: Twit) => {
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
            </div>
        </HomeLayout>
    );
};

export default User;
