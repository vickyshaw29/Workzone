import { storage } from "@/appwrite"

const getURL = async (image: { bucketId: string; fileId: string }) => {
  try {
    const result = storage.getFileView(image.bucketId, image.fileId)
    return result
  } catch (error) {
    return null
  }
}

export default getURL
