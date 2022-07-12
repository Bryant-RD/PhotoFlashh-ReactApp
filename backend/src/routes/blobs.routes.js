import { Router } from "express";
import multer from "multer"
import { uploadImg } from "../controllers/blobs.controller.js";

const upload = multer();

const blobRouter = Router();

blobRouter.post("/upload-img", upload.array("file", 12), uploadImg)

export default blobRouter