import { storage } from "@/appwrite"
const getURL = async (image: Image) => {
    console.log(image,"BUCKETID");
    const url = storage.getFilePreview(image.bucketId, image.fileId);
    return url;
};


export default getURL;