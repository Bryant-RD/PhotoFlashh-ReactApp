import { BlobServiceClient } from "@azure/storage-blob"
import { config } from "dotenv"


config();

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const bucketName = process.env.BUCKET_NAME;

export const uploadImg = async (req, res) => {

    // console.log(req.body.files);
 

    try {
        console.log(req.files);
        const { container } = req.body;
        

        for (let i = 0; i < req.files.length; i++) {

            const { originalname, buffer } = req.files[i];
            const containerClient = blobService.getContainerClient(bucketName);
            await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
        }

        res.json({
            message: "succes"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}