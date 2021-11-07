import axios from "axios";
const LocalURL = "http://127.0.0.1:8000/api/user/";

/* eslint-disable import/no-anonymous-default-export */
export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
  
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
      header["Accept"] = "application/json";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "application/json";
      header["Access-Control-Allow-Origin"] = "*";
      
    }
    if (token && token !== undefined) {
      header["Authorization"]='Bearer ' + token
    }
    return header;
  },

  
  registerUser(data) {
    return axios({
      method: "post",
      url: `${this.url}register`,
      headers: this.headers(),
      data,
    });
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}login`,
      headers: this.headers(),
      data,
    });
  },

  processImage(data) {
    return axios({
      method: "post",
      url: `${this.url}process-image`,
      headers: this.headers(true),
      data,
    });
  },
};
