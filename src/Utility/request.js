import Toast from "react-native-toast-message";

const API_ENDPOINT = 'https://log-booking.finloge.com/api';
export const ImgUrl = `https://log-booking.finloge.com/`
export const ImgMediaUrl = `https://log-manage.finloge.com/media/`
const get = async (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    let baseURL = API_ENDPOINT + url;
    let token = 'ca6b795b-9ff9-41b0-9e84-60a4ffe74ab0';
    try {
      console.log('url--', baseURL);
      let result = await fetch(baseURL, {
        ...options,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add the Authorization header
          'Content-Type': 'application/json', // Optional: Add if required
          ...(options.headers || {}), // Merge with existing headers if any
        },
      });
      const response = await result.json();
      console.log('resss', response);
      if (result.ok) {
        resolve(response);
      } else {
        resolve(response);
        Toast.show({
          type: 'error',
          text1: response?.error,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};


// Post method
const post = async (url, data, method = 'POST') => {
  return new Promise(async (resolve, reject) => {
    let baseURL = API_ENDPOINT + url;
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const response = await fetch(baseURL, {
        method: method,
        headers,
        body: data,
      });
      const result = await response.json();
      if (result.status || result.success) {
        resolve(result);
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error);
    }
  });
};

// Delete method
const Delete = async (url, data, method = 'POST') => {
   return new Promise(async (resolve, reject) => {
    let baseURL = API_ENDPOINT + url;
    try {
      const headers = {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data;',
      };
     
      const response = await fetch(baseURL, {
        method: method,
        headers,
        body: data,
      });
      const result = await response.json();
      if (result.status || result.success) {
        resolve(result);
      } else {
        resolve(result)
      }
    } catch (error) {
      console.error('error',error)
      reject(error);
    }
  });
};


const payPostReq = async (url, data, method = 'POST') => {
  return new Promise(async (resolve, reject) => {
    let baseURL = url;
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const response = await fetch(baseURL, {
        method: method,
        headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status || result.success) {
        resolve(result);
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  get,
  post,
  Delete,
  payPostReq
};
