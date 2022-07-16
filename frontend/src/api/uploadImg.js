import axios from "axios"


export const HandleSubmitImages = async (e, images) => {

  const imagen = images[0].file[0];
  console.log(imagen);

  const formData = new FormData();

  images.forEach((image) => {
    formData.append("image", image.file[0])
  });

  return await axios.post("/storage/blob/upload-img", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  });
}