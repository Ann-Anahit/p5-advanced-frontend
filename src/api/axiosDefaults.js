import axios from "axios";

axios.defaults.baseURL = "https://8000-annanahit-drfapi-8hp2g0b8pys.ws.codeinstitute-ide.net/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;


export const axiosReq = axios.create();
export const axiosRes = axios.create();