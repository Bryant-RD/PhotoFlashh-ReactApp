import logo from "./img/logo1.png"
// import './app.css'
import { useState } from "react"
import { HandleSubmitImages } from "./api/uploadImg.js"




function App() {


  const [images, setImages] = useState([]);
  const [eventImg, setEventImg] = useState([]);
  const handleTakeImages = (e) => {
    setEventImg(e)
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
          // console.log(newImgsToState);
          // setImages(olData => [...olData, newImgsToState[0]])
          const newImgsState = images.concat(newImgsToState);
          console.log(newImgsState);
          setImages(newImgsState)
        }else{
          setImages(newImgsToState)
        }

  } 

  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;

    //el array con las imagenes nuevas
    const arrayImages = [];

    Object.keys(files).forEach((i) => {
      const file = files[i];

      let url = URL.createObjectURL(file);

      //console.log(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file
      });

      indexInicial++;
    });

    //despues de haber concluido el ciclo retornamos las nuevas imagenes
    return arrayImages;
  }

  function deleteImg(indice) {

    let dt = new DataTransfer()

    
    for(let  i = 0; i < eventImg.target.files.length; i++){
      const restFile = eventImg.target.files
        console.log(restFile)
    }


    

    // const newImgs = images.filter((item) => item.index !== indice.index)
    // setImages(newImgs);
  }


  // frontend\src\img\background.jpg

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
          <input type="file" multiple name="images" id="inputImg"
          className="file:bg-rojo file:text-xl file:text-white file:font-semibold file:rounded-lg file:px-6 file:py-3.5 file:my-3 file:w-auto file:absolute text-white"
          onChange={handleTakeImages}
            />
          <button
          type="submit"
          className="bg-verde text-xl text-white font-semibold rounded-lg px-14 py-4 my-3 flex-1 mx-1 absolute ml-48"
          onClick={ (e)=> {
            e.preventDefault();
            HandleSubmitImages(eventImg) // 365 677
          } }
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
