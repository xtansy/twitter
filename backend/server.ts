import session from "express-session";
import passport from "./core/passport";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

import { UserCtrl } from "./controllers/UserController";
import { TwitsCtrl } from "./controllers/TwitsController";
import { UploadFileCtrl } from "./controllers/UploadFileController";
import { registerValidations } from "./validations/register";
import "./core/db";
import { createTwitValidations } from "./validations/createTwit";

const app = express();

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);

app.use(passport.initialize());

app.use(express.json());

app.get("/users", UserCtrl.index); // get all users

app.get(
    "/users/me",
    passport.authenticate("jwt", { session: false }),
    UserCtrl.getUserInfo
);

app.get("/users/:id", UserCtrl.show); // get 1 user

app.get("/auth/verify", UserCtrl.verify); // verify hash

app.post("/auth/register", registerValidations, UserCtrl.create); // create user

app.post("/auth/login", passport.authenticate("local"), UserCtrl.afterLogin); // jwt

app.get("/twits", TwitsCtrl.index);

app.get("/twits/:id", TwitsCtrl.show);
app.get("/usertwits/:id", TwitsCtrl.userTwits);

app.post(
    "/twits/create",
    passport.authenticate("jwt"),
    createTwitValidations,
    TwitsCtrl.create
);
app.delete("/twits/:id", passport.authenticate("jwt"), TwitsCtrl.delete);

app.patch(
    "/twits/:id",
    passport.authenticate("jwt"),
    createTwitValidations,
    TwitsCtrl.update
);

app.post("/upload", upload.single("image"), UploadFileCtrl.upload);

app.listen(process.env.PORT || 8888, () => {
    console.log("SERVER RUNNED!");
});
