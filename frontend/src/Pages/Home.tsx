import { Routes, Route } from "react-router-dom";
import { HomeLayout } from "../layouts";
import { AddTwitForm, BackButton, SingleTweet, Twits } from "../components";

import { useLocation } from "react-router-dom";

const Home = () => {
    const arr = useLocation().pathname.split("/");
    const isHome = arr.pop() === "home";
    // const isSingleTwit = arr[arr.length - 1] === "tweets";

    return (
        <HomeLayout>
            <div className="home__content-header">
                {!isHome && <BackButton />}

                {isHome ? (
                    <h1 className="home__content-title">Твиты </h1>
                ) : (
                    <h1 className="home__content-title">Твитнуть</h1>
                )}
            </div>

            {isHome && <AddTwitForm />}

            <div className="home__content-twits">
                <Routes>
                    <Route path="home" element={<Twits />} />
                    <Route path="home/tweets/:id" element={<SingleTweet />} />
                </Routes>
            </div>
        </HomeLayout>
    );
};

export default Home;
