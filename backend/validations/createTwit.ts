import { body } from "express-validator";

export const createTwitValidations = [
    body("text", "Введите текст твита")
        .isString()
        .isLength({ max: 280 })
        .withMessage("Макс длина твита 280 символов"),
];
