import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ModalBlock } from "../../components";
import { fetchRegisterUser } from "../../redux/userSlice/userSlice";
import { useAppDispatch } from "../../redux/store";

interface SignUpModalProps {
    visible: boolean;
    onClose: () => void;
}

export interface RegisterProps {
    email: string;
    username: string;
    fullname: string;
    password: string;
    password2: string;
}
const RegisterSchema = yup
    .object({
        email: yup.string().email("Неверная почта").required("Введите почту"),
        username: yup.string().required("Введите username"),
        fullname: yup.string().required("Введите fullname"),
        password: yup
            .string()
            .min(6, "Минимальная длина пароля 6 символов")
            .required("Введите пароль"),
        password2: yup
            .string()
            .oneOf([yup.ref("password")], "Пароли не совпадают"),
    })
    .required();

const SignUpModal: React.FC<SignUpModalProps> = ({ visible, onClose }) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterProps>({
        resolver: yupResolver(RegisterSchema),
    });
    const onSubmit = (data: RegisterProps) => {
        onClose();
        dispatch(fetchRegisterUser(data));
    };
    return (
        <ModalBlock
            title={"Создайте учетную запись"}
            visible={visible}
            onClose={onClose}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form signIn__form"
            >
                <input
                    {...register("username")}
                    className={
                        !errors.username?.message ? "form__name" : "error-input"
                    }
                    type="text"
                    placeholder="username"
                />
                <p className="error">{errors.username?.message}</p>
                <input
                    {...register("fullname")}
                    className={
                        !errors.fullname?.message ? "form__name" : "error-input"
                    }
                    type="text"
                    placeholder="fullname"
                />
                <p className="error">{errors.fullname?.message}</p>

                <input
                    {...register("email")}
                    className={
                        !errors.email?.message ? "form__email" : "error-input"
                    }
                    type="text"
                    placeholder="E-mail"
                />
                <p className="error">{errors.email?.message}</p>

                <input
                    {...register("password")}
                    className={
                        !errors.password?.message
                            ? "form__password"
                            : "error-input"
                    }
                    type="text"
                    placeholder="password"
                />
                <p className="error">{errors.password?.message}</p>

                <input
                    {...register("password2")}
                    className={
                        !errors.password2?.message
                            ? "form__password"
                            : "error-input"
                    }
                    type="text"
                    placeholder="Подвердите пароль"
                />
                <p className="error">{errors.password2?.message}</p>

                <button className="button">Далее</button>
            </form>
        </ModalBlock>
    );
};

export default SignUpModal;
