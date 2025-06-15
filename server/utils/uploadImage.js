// utils/uploadImage.js
const axios = require("axios");
const FormData = require("form-data");

const uploadImageToImgbb = async (base64Image) => {
  try {
    const form = new FormData();
    form.append("image", base64Image);

    const imgbbApiKey = "f738ac3a2bbd4ec4ef2ed6a4a1388bc2";
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      form,
      { headers: form.getHeaders() }
    );

    console.log("Image uploaded successfully:", response);

    return response.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error.message);
    throw new Error("Image upload to imgbb failed.");
  }
};

module.exports = uploadImageToImgbb;
