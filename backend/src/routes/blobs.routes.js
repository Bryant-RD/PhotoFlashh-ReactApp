import { Router } from "express";
import multer from "multer"
import { uploadImg } from "../controllers/blobs.controller.js";

const upload = multer();

const blobRouter = Router();

blobRouter.post("/upload-img", upload.single("file"), uploadImg)

export default blobRouter