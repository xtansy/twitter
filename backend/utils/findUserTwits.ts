import { TwitsModel } from "../models/TwitModel";

const findUserTwits = async (userId: string) => {
    const twits = await TwitsModel.find({}).populate("user").exec();

    return twits.filter((item) => String(item.user._id) === userId);
};

export default findUserTwits;
