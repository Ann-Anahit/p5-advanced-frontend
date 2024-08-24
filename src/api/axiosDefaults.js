import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "https://drf-api-pp-0ae57f00f3cd.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
