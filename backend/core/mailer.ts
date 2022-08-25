import nodemailer from "nodemailer";

var options = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8d87c3b3daaac4",
        pass: "ae9f6b8bd3fc9b",
    },
};

const transport = nodemailer.createTransport(options);

export default transport;
