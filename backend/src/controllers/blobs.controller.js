import { BlobServiceClient } from "@azure/storage-blob"
import { config } from "dotenv"


config();

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

export const uploadImg = async (req, res) => {

    // console.log(req.body.files);
 

    try {
        console.log(req.files);
        const { container } = req.body;
        const { originalname, buffer } = req.files;

        const containerClient = blobService.getContainerClient(container);
        await containerClient.getBlockBlobClient(originalname).uploadData(buffer)
        res.json({
            message: "succes"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}