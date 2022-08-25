import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useState } from "react";
import { useSelector } from "react-redux";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { userLoadingSelector } from "../../redux/userSlice/selectors";
import { LoadingStatus } from "../../redux/twitsSlice/types";

enum ModalType {
    SignIn, // войти
    SignUp, // зарегаться
}

function SignIn() {
    const userLoadingStatus = useSelector(userLoadingSelector);

    const [visibleModal, setVisibleModal] = useState<ModalType | undefined>(
        undefined
    );

    const onOpenSignIn = () => {
        setVisibleModal(ModalType.SignIn);
    };

    const onOpenSignUp = () => {
        setVisibleModal(ModalType.SignUp);
    };

    const onCloseModal = () => {
        setVisibleModal(undefined);
    };

    return (
        <>
            <SignInModal
                visible={visibleModal === ModalType.SignIn}
                onClose={onCloseModal}
            />
            <SignUpModal
                visible={visibleModal === ModalType.SignUp}
                onClose={onCloseModal}
            />
            <div className="signIn">
                {/* {userLoadingStatus === LoadingStatus.ERROR && (
                    <div className="signIn__alert">
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            This is an error alert —{" "}
                            <strong>check it out!</strong>
                        </Alert>
                    </div>
                )}
                {userLoadingStatus === LoadingStatus.LOADED && (
                    <div className="signIn__alert">
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            This is a success alert —{" "}
                            <strong>check it out!</strong>
                        </Alert>
                    </div>
                )} */}

                <div className="signIn__left">
                    <div className="signIn__left-text">
                        <div className="signIn__left-text-block">
                            <img
                                width={32}
                                src="signin/icons/search.png"
                                alt="lupa"
                            />
                            <p>Читайте о том, что вам интересно.</p>
                        </div>
                        <div className="signIn__left-text-block">
                            <img
                                width={32}
                                src="signin/icons/people.png"
                                alt="people"
                            />
                            <p>Узнайте, о чем говорят в мире.</p>
                        </div>
                        <div className="signIn__left-text-block">
                            <img
                                width={32}
                                src="signin/icons/chat.png"
                                alt="chat"
                            />
                            <p>Присоединяйтесь к общению.</p>
                        </div>
                    </div>
                </div>
                <div className="signIn__right">
                    <img
                        width={64}
                        src="signin/icons/logo.png"
                        alt="logo"
                        className="signIn__right-logo"
                    ></img>
                    <h1>Узнайте, что происходит в мире прямо сейчас</h1>
                    <p>Присоединяйтесь прямо сейчас!</p>
                    <div className="signIn__right-signIn">
                        <button
                            onClick={onOpenSignUp}
                            className="signIn__right-signIn-signButton button"
                        >
                            Зарегистрироваться
                        </button>
                        <button
                            onClick={onOpenSignIn}
                            className="signIn__right-signIn-go button outline"
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
