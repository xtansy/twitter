var LocalStrategy = require("passport-local");
var passport = require("passport");

import { UserModel } from "../models/UserModel";
import { generateMD5 } from "../utils/generateHash";
import { IUserModel } from "../models/UserModel";
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const strategy = new LocalStrategy(async function verify(
    username,
    password,
    cb
): Promise<void> {
    try {
        const user = await UserModel.findOne({
            $or: [{ email: username }, { username }],
        }).exec();
        if (!user) {
            return cb(null, false);
        }
        if (
            // user.confirmed &&
            user.password === generateMD5(password + process.env.SECRET_KEY)
        ) {
            return cb(null, user);
        }
        return cb(null, false);
    } catch (error) {
        return cb(error, false);
    }
});
passport.use(strategy);

passport.serializeUser(function (user: IUserModel, cb) {
    cb(null, user?._id);
});

passport.deserializeUser(function (id, cb) {
    UserModel.findById(id, (err, user) => {
        cb(err, user);
    });
});

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_KEY || "123",
            jwtFromRequest: ExtractJWT.fromHeader("token"),
        },
        async (payload: { data: IUserModel }, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).exec();
                if (user) {
                    return done(null, user);
                }
                done(null, false);
            } catch (error) {
                done(error, false);
            }
        }
    )
);
export default passport;
