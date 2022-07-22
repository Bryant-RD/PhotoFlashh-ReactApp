import express from "express";
import  blobRouter from "./routes/blobs.routes.js"
import { Server as WebSocketServer } from "socket.io"
import http from "http"
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

const httpServer = http.createServer(app)
const io = new WebSocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


io.on('connection', socket => {
  console.log("new Connection");



  const {roomName} = socket.handshake.query;
  socket.join(roomName)

  const message = "hola desde nodeJS, en la sala: " + roomName;

  io.in(roomName).emit('message', message);

  socket.on('namesImages', namesImages => {
    console.log(namesImages);
    socket.in(roomName).emit('imagenes', namesImages);
  })

  // socket.on('fromReact', mensaje => {
  //   console.log(mensaje);
  // })

  socket.on("discconect", () => {
    console.log("usuario desconectado");
  })
})

httpServer.listen(port);
console.log("server running on port " + port);