import BackspaceIcon from "@mui/icons-material/Backspace";

interface ImageListProps {
    images: string[];
    onClickDeleteImage: (url: string) => void;
}

const ImageList: React.FC<ImageListProps> = ({
    images,
    onClickDeleteImage,
}) => {
    if (!images.length) {
        return null;
    }
    return (
        <div className="upload__images">
            {images.map((item, i) => {
                return (
                    <div key={i} className="upload__images-item">
                        <BackspaceIcon
                            onClick={() => onClickDeleteImage(item)}
                            style={{ fill: "pink" }}
                        />
                        <img key={item} src={item} alt="img"></img>
                    </div>
                );
            })}
        </div>
    );
};

export default ImageList;
