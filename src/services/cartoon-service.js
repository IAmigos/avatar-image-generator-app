import axios from 'axios';
import config from '../config';

const cartoonService = {

  sendImageToConvert: async (imageFile) => {
    const formData = new FormData();
    formData.append('face_image', imageFile);

    const url = `${config.api}/send_image`;
    return await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  getCartoonImage: async (filename) => {
    const url = `${config.api}/predict`;
    const formData = new FormData();

    formData.append('filename_cartoon', filename);
    return await axios.post(url, formData, {responseType: 'blob'});
  }
};

export default cartoonService;