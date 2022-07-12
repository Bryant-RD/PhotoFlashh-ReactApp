import axios from "axios"


export const HandleSubmitImages = async (evento, images) => {

  const imagen = images[0].file;
  console.log(imagen)
  // console.log(images.file);
  const formData = new FormData();

  formData.append('file', imagen);


  return await axios.post("/storage/blob/upload-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
}