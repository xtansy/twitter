import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connect(
    process.env.MONGODB_URI ||
        "mongodb+srv://admin:admin@cluster0.pc9j6.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

export { db, mongoose };
