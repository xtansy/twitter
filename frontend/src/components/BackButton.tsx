import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const onClickButton = () => {
        goBack();
    };
    return (
        <IconButton
            onClick={onClickButton}
            color="primary"
            className="home__content-header__back"
        >
            <ArrowBackIcon />
        </IconButton>
    );
};

export default BackButton;
