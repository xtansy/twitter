import IconButton from "@mui/material/IconButton";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";

import { useRef, useEffect } from "react";
import { ImageObj } from "./AddTwitForm";

import ImageList from "./ImageList";

interface UploadImagesProps {
    images: ImageObj[];
    setImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ images, setImages }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickUpload = () => {
        inputRef.current?.click();
    };

    const handleChangeFileInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            const fileObj = new Blob([file]);
            setImages((prev) => [
                ...prev,
                {
                    blobUrl: URL.createObjectURL(fileObj),
                    file,
                },
            ]);
        }
    };

    const onClickDeleteImage = (url: string) => {
        setImages((prev) => prev.filter((item) => item.blobUrl !== url));
    };

    useEffect(() => {
        inputRef.current?.addEventListener("change", handleChangeFileInput);

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener(
                    "change",
                    handleChangeFileInput
                );
            }
        };
    }, []);
    return (
        <div className="upload">
            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                id="upload-input"
            />
            <IconButton onClick={handleClickUpload} color="primary">
                <PhotoOutlinedIcon />
            </IconButton>

            <ImageList
                images={images.map((item) => item.blobUrl)}
                onClickDeleteImage={onClickDeleteImage}
            />
        </div>
    );
};

export default UploadImages;
