import { Router } from "express";
import multer from "multer"
import { uploadImg } from "../controllers/blobs.controller.js";

const upload = multer();

const blobRouter = Router();

blobRouter.post("/upload-img", upload.array("image"), uploadImg)

export default blobRouter