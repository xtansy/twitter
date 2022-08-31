import { HomeLayout } from "../layouts";
import { BackButton } from "../components";
import { SingleTweet } from "../components";

const SingleTwitPage = () => {
    return (
        <HomeLayout>
            <div className="home__content-header">
                <BackButton />

                <h1 className="home__content-title">Твитнуть</h1>
            </div>

            <div className="home__content-twits">
                <SingleTweet />
            </div>
        </HomeLayout>
    );
};

export default SingleTwitPage;
