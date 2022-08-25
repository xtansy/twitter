import express from "express";
import { validationResult } from "express-validator";

import { isValidObjectId } from "../utils/isValidObjectId";
import {
    ITwitsModel,
    ITwitsModelDocument,
    TwitsModel,
} from "../models/TwitModel";
import { IUserModel } from "../models/UserModel";

class TwitsController {
    async index(_: any, res: express.Response): Promise<void> {
        try {
            const twits = await TwitsModel.find({}).populate("user").exec();
            res.json({
                status: "success",
                data: twits,
            });
        } catch (error) {
            res.json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }
    async show(req: any, res: express.Response): Promise<void> {
        try {
            const twitId = req.params.id;

            if (!isValidObjectId(twitId)) {
                res.status(400).send();
                return;
            }

            const twit = await TwitsModel.findById(twitId)
                .populate("user")
                .exec();

            if (!twit) {
                res.status(400).send();
                return;
            }

            res.json({
                status: "success",
                data: twit,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: JSON.stringify(error),
            });
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const user = req.user as ITwitsModelDocument;
            if (user) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const data: ITwitsModel = {
                    text: req.body.text,
                    user: user._id,
                    images: req.body.images,
                };

                const twit = await TwitsModel.create(data);

                res.json({
                    status: "succes",
                    data: await twit.populate("user"),
                });
            }
        } catch (error) {
            res.json({
                status: "error",
                message: JSON.stringify(error),
            });
        }
    }

    async delete(req: express.Request, res: express.Response) {
        const user = req.user as IUserModel;
        try {
            if (user) {
                const twitId = req.params.id;

                if (!isValidObjectId(twitId)) {
                    res.status(400).send();
                    return;
                }

                const twit = await TwitsModel.findById(twitId);
                if (twit) {
                    if (String(twit.user._id) === String(user._id)) {
                        twit.remove();
                        res.send();
                    } else {
                        res.status(403).send();
                    }
                } else {
                    res.status(404).send();
                }
            }
        } catch (error) {
            res.json({
                status: "error",
                message: JSON.stringify(error),
            });
        }
    }

    async update(req: express.Request, res: express.Response) {
        const user = req.user as IUserModel;
        try {
            if (user) {
                const twitId = req.params.id;

                if (!isValidObjectId(twitId)) {
                    res.status(400).send();
                    return;
                }

                const twit = await TwitsModel.findById(twitId);
                if (twit) {
                    if (String(twit.user._id) === String(user._id)) {
                        const text = req.body.text;
                        twit.text = text;
                        twit.save();
                        res.send();
                    } else {
                        res.status(403).send();
                    }
                } else {
                    res.status(404).send();
                }
            }
        } catch (error) {
            res.json({
                status: "error",
                message: JSON.stringify(error),
            });
        }
    }
}

export const TwitsCtrl = new TwitsController();
