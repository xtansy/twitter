import { useEffect } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import { fetchTags } from "../redux/tagsSlice/tagsSlice";
import {
    tagsItemsSelector,
    tagsLoadingStatusSelector,
} from "../redux/tagsSlice/selectors";
import { TagsLoadingStatus } from "../redux/tagsSlice/types";

const Tags = () => {
    const dispatch = useAppDispatch();

    const tags = useSelector(tagsItemsSelector);
    const loadingStatus = useSelector(tagsLoadingStatusSelector);

    useEffect(() => {
        dispatch(fetchTags());
    }, []);

    if (loadingStatus === TagsLoadingStatus.LOADING) {
        return <CircularProgress />;
    }

    return (
        <ul className="home__search-actual__ul">
            {tags.map((item) => {
                return (
                    <Link
                        key={item.id}
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/home/search?q=${item.name}`}
                    >
                        <li>
                            <p>{item.name}</p> <span>Твитов: {item.count}</span>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
};

export default Tags;
