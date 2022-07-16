import axios from "axios"


export const HandleSubmitImages = async (e, images) => {

  const formData = new FormData();

  images.forEach((image) => {
    formData.append("image", image.file[0])
  });

  const retorno = await axios.post("/storage/blob/upload-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });

  console.log(retorno.data);

  return retorno
}