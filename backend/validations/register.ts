import { body } from "express-validator";

export const registerValidations = [
    body("email", "Введите E-mail")
        .isEmail()
        .withMessage("Неверный E-Mail")
        .isLength({
            min: 5,
            max: 40,
        })
        .withMessage("Короткий E-Mail"),

    body("fullname", "Введите имя")
        .isString()
        .withMessage("Неверное имя")
        .isLength({
            min: 2,
            max: 40,
        })
        .withMessage("Короткое имя"),
    body("username", "Введите логин")
        .isString()
        .withMessage("Неверный логин")
        .isLength({
            min: 2,
            max: 40,
        })
        .withMessage("Короткий логин"),

    body("password", "Введите пароль")
        .isString()
        .withMessage("Неверный пароль")
        .isLength({
            min: 6,
        })
        .withMessage("Короткий пароль")
        .custom((password, { req }) => {
            if (password !== req.body.password2) {
                throw new Error("Пароли не совпадают");
            } else {
                return password;
            }
        }),
];
