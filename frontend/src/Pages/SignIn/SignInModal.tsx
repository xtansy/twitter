import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/store";

import { ModalBlock } from "../../components";
import { fetchLoginUser } from "../../redux/userSlice/userSlice";

interface SignInModalProps {
    visible: boolean;
    onClose: () => void;
}
export interface LoginProps {
    username: string;
    password: string;
}
const LoginSchema = yup
    .object({
        username: yup
            .string()
            .email("Неверная почта")
            .required("Введите почту"),
        password: yup
            .string()
            .min(6, "Минимальная длина пароля 6 символов")
            .required("Введите пароль"),
    })
    .required();

const SignInModal: React.FC<SignInModalProps> = ({ visible, onClose }) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginProps>({
        resolver: yupResolver(LoginSchema),
    });
    const onSubmit = (data: LoginProps) => {
        dispatch(fetchLoginUser(data));
    };

    return (
        <ModalBlock
            title={"Войти в аккаунт Twitter"}
            visible={visible}
            onClose={onClose}
        >
            <form
                className="form signIn__form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    {...register("username")}
                    className={
                        !errors.username?.message
                            ? "form__email"
                            : "error-input"
                    }
                    type="text"
                    placeholder="E-mail"
                />

                <p className="error">{errors.username?.message}</p>

                <input
                    {...register("password")}
                    className={
                        !errors.password?.message
                            ? "form__pasword"
                            : "error-input"
                    }
                    type="text"
                    placeholder="Password"
                />

                <p className="error">{errors.password?.message}</p>

                <button type="submit" className="button">
                    Войти
                </button>
            </form>
        </ModalBlock>
    );
};

export default SignInModal;
