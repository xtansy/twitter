import { Schema, model, Document } from "mongoose";

export interface ITwitsModel {
    _id?: string;
    text: string;
    // likes: number;
    // retwits: number;
    user: ITwitsModelDocument;
    images?: string[];
}
export type ITwitsModelDocument = ITwitsModel & Document;

const TwitsSchema = new Schema<ITwitsModel>(
    {
        text: {
            required: true,
            type: String,
            maxlength: 280,
        },
        user: {
            required: true,
            ref: "User",
            type: Schema.Types.ObjectId,
        },
        images: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

export const TwitsModel = model<ITwitsModelDocument>("Twits", TwitsSchema);
