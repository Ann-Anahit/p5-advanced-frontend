import axios from "axios";

axios.defaults.baseURL = "https://meetandmingle-01eaa763465e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;


export const axiosReq = axios.create();
export const axiosRes = axios.create();