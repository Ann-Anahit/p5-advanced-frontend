import axios from "axios";

axios.defaults.baseURL = "https://drf-api-pp-0ae57f00f3cd.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
});

export const axiosRes = axios.create({
    baseURL: axios.defaults.baseURL,
    withCredentials: true,
});

export default axios;  
