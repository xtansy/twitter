import { axios } from "../core/axios";

export interface UploadImageRequestResult {
    height: number;
    size: number;
    url: string;
    width: number;
}
export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axios.post<UploadImageRequestResult>(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};
