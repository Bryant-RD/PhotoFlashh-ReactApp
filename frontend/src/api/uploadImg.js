import axios from "axios"


export const HandleSubmitImages = async (images) => {

  const imagen = images.target.files;
  console.log(imagen)
  const formData = new FormData();

  formData.append('userName', 'Fred');
  formData.append('files', imagen);


  console.log(formData);

  // for (let key in imagen) {
  //   formData.append(key, imagen[key]);
  // }

  // return await axios.post("/storage/blob/upload-img", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   },
  // });

  // {
  //   method: "POST",
  //   url: "/storage/blob/upload-img",
  //   body: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   },
  // }
  axios.post("/storage/blob/upload-img", formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });

}