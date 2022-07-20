import { useState } from "react"
import { useParams } from "react-router-dom"
import { HandleSubmitImages } from "../api/uploadImg.js"
import logo from "../img/logo1.png"
// import socket from "../components/Socket.js";
import { io } from "socket.io-client";



export function Formuario() {

  let { id } = useParams();


  // socket.emit('room', id);

  // console.log(id);

  const socket = io("http://localhost:4000", {
    query: {
      roomName: id
    }
  })

  // socket.on('message', rec => {
  //   console.log(rec);
  // })

  socket.on('message',  rec => {
    console.log(rec);
  })
  // socket.emit('idCliente', id);
  

    const [images, setImages] = useState([]);
    const handleTakeImages = (e) => {
          //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
          let indexImg;
  
          //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
  
          if (images.length > 0) {
            indexImg = images[images.length - 1].index + 1;
          } else {
            indexImg = 0;
          }
  
          
          let newImgsToState = readmultifiles(e, indexImg);
  
  
          if(images.length > 0  ){
            const newImgsState = images.concat(newImgsToState);
            console.log(newImgsState);
            setImages(newImgsState)
          }else{
            setImages(newImgsToState)
          }
        // console.log(images.file);
    } 
  
    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;
  
      let imagenes = e.currentTarget.files;
      console.log(imagenes);
  
      //el array con las imagenes nuevas
      const arrayImages = [];
  
      Object.keys(files).forEach((i) => {
        const file = files[i];
  
        let url = URL.createObjectURL(file);
  
        // console.log(file);
        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file: imagenes
        });
  
        indexInicial++;
      });
  
      //despues de haber concluido el ciclo retornamos las nuevas imagenes
      return arrayImages;
    }
  
    function deleteImg(indice) {
  
      const newImgs = images.filter((item) => item.index !== indice.index)
      setImages(newImgs);
    }
  
    return (
      <div className=" relative flex justify-center flex-col">
        <div className="header flex flex-row justify-center">
          <img src={logo} width="150px" height="100px" className="object-center" />
        </div>
        <div className="flex justify-center" >
          <div className="container-pictures p-4 w-3/4 outline outline-2 outline-naranja flex flex-wrap justify-center rounded-lg absolute">
  
             {
                images.map(item => (
                  <div className="my-2 m-5  flex flex-col" key={item.index} >
                      <div className="absolute" id="caja" >
                        <button id="eliminar"
                            className="px-2 bg-rojo text-center items-center rounded-lg  hover:cursor-pointer "
  
                            onClick={ ()=> {
                              deleteImg(item)
                            }}
                        >
                        x
                        </button>
                      </div>
                    <img src={item.url} width="200px" height="200px"/>
                </div>
                ))
              }
            
          </div>
        </div>
        <div id="botones" className="w-full justify-center px-2 fixed" >
          <form className="flex justify-center">
            <input type="file" multiple name="file" id="inputImg"
            className="file:bg-rojo file:text-xl file:text-white file:font-semibold file:rounded-lg file:px-6 file:py-3.5 file:my-3 file:w-auto file:absolute text-white"
            onChange={handleTakeImages}
              />
            <button
            type="submit"
            className="bg-verde text-xl text-white font-semibold rounded-lg px-14 py-4 my-3 flex-1 mx-1 absolute ml-48"
            onClick={ (e)=> {
              e.preventDefault();
              let namesImages = [];
              for (let i = 0; i < images.length; i++) {
                namesImages.push(images[i].name)
              }
              socket.emit('nameImages', namesImages);
              HandleSubmitImages(images) // 365 677
            } }
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }