import { storage, ID } from "@/appwrite";

const uploadImage = async(file:File)=> {
    if(!file) return ;
    const fileUploadeded = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
        ID.unique(),
        file
    )
    return fileUploadeded
}

export default uploadImage