import { HomeLayout } from "../layouts";
import { AddTwitForm, Twits } from "../components";

const Home = () => {
    return (
        <HomeLayout>
            <div className="home__content-header">
                <h1 className="home__content-title">Твиты </h1>
            </div>

            <AddTwitForm />

            <div className="home__content-twits">
                <Twits />
            </div>
        </HomeLayout>
    );
};

export default Home;
