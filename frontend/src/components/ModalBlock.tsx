import React from "react";

interface ModalProps {
    title: string;
    visible: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

const ModalBlock: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    children,
}) => {
    if (!visible) {
        return null;
    }
    const onClickClose = () => {
        onClose();
    };
    return (
        <div className="modal__wrapper">
            <div className="modal">
                <div className="modal__title">
                    <img
                        onClick={onClickClose}
                        width={23}
                        src="modal/krest.png"
                        alt="krest"
                    />
                    <h3>{title}</h3>
                </div>
                <div className="modal__content">{children}</div>
            </div>
        </div>
    );
};

export default ModalBlock;
