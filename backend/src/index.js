import express from "express";
import  blobRouter from "./routes/blobs.routes.js"
import { config } from "dotenv";
import  cors from "cors"

config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000'
  }
  
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/storage/blob", blobRouter);

const port = process.env.PORT;

app.listen(4000);
console.log("server running on port " + port);