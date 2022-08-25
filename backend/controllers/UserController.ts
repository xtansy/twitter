import express from "express";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";
import { UserModel } from "../models/UserModel";
import { generateMD5 } from "../utils/generateHash";
import sendEmail from "../utils/sendEmail";
import { IUserModel, IUserModelDocument } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class UserController {
    async show(req: any, res: express.Response): Promise<void> {
        try {
            const userId = req.params.id;

            if (!isValidObjectId(userId)) {
                res.status(400).send();
                return;
            }

            const user = await UserModel.findById(userId).exec();

            if (!user) {
                res.status(400).send();
                return;
            }

            res.json({
                status: "success",
                data: user,
            });
        } catch (error) {
            res.json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }

    async index(_: any, res: express.Response): Promise<void> {
        try {
            const users = await UserModel.find({}).exec();
            res.json({
                status: "success",
                data: users,
            });
        } catch (error) {
            res.json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const data: IUserModel = {
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: generateMD5(
                    req.body.password + process.env.SECRET_KEY
                ),
                confirmedHash: generateMD5(
                    process.env.SECRET_KEY || Math.random().toString()
                ),
            };

            const user = await UserModel.create(data);

            // sendEmail(
            //     {
            //         emailFrom: "admin@test.com",
            //         emailTo: data.email,
            //         subject: "Подтверждение почты Skiddy Twitter",
            //         html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
            //             process.env.PORT || 8888
            //         }/auth/verify?hash=${
            //             data.confirmedHash
            //         }">по этой ссылке</a>`,
            //     },
            //     (err: Error | null) => {
            //         if (err) {
            //             res.json({
            //                 status: "error",
            //                 message: JSON.stringify(err),
            //             });
            //         } else {
            //             res.json({
            //                 status: "success",
            //                 data: user,
            //             });
            //         }
            //     }
            // );
            res.json({
                status: "success",
                data: user,
            });
        } catch (error) {
            res.json({
                status: "error",
                message: JSON.stringify(error),
            });
        }
    }

    async verify(req: express.Request, res: express.Response) {
        try {
            const hash = req.query.hash;

            if (!hash) {
                res.status(400).send();
            }

            const user = await UserModel.findOne({
                confirmedHash: hash,
            }).exec();

            if (user) {
                user.confirmed = true;
                user.save();

                res.json({
                    status: "success",
                });
            } else {
                res.status(404).send();
            }
        } catch (error) {
            res.json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }

    async afterLogin(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user && (req.user as IUserModelDocument).toJSON();
            res.json({
                status: "success",
                data: {
                    ...user,
                    token: jwt.sign(
                        {
                            data: req.user,
                        },
                        process.env.SECRET_KEY || "123",
                        {
                            expiresIn: "30 days",
                        }
                    ),
                },
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }

    async getUserInfo(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user && (req.user as IUserModelDocument).toJSON();
            res.json({
                status: "success",
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }
}

export const UserCtrl = new UserController();
