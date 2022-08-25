import { Schema, model, Document } from "mongoose";

export interface IUserModel {
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    location?: string;
    password: string;
    confirmed?: boolean;
    confirmedHash: string;
    about?: string;
    website?: string;
}
export type IUserModelDocument = IUserModel & Document;

const UserSchema = new Schema<IUserModel>(
    {
        email: {
            unique: true,
            required: true,
            type: String,
        },
        fullname: {
            required: true,
            type: String,
        },
        username: {
            unique: true,
            required: true,
            type: String,
        },
        location: String,
        password: {
            required: true,
            type: String,
            // select: false,
        },
        confirmed: {
            default: false,
            type: Boolean,
        },
        confirmedHash: {
            required: true,
            type: String,
            // select: false,
        },
        about: String,
        website: String,
    },
    {
        versionKey: false,
    }
);

UserSchema.set("toJSON", {
    transform: (_, obj) => {
        delete obj.password;
        delete obj.confirmedHash;
        return obj;
    },
});

export const UserModel = model<IUserModelDocument>("User", UserSchema);
