import axios from "axios";
import authHeader from './services/auth.header'

const BASE_URL = "http://localhost:8080"
const itemAxios = axios.create({
    baseURL: BASE_URL + "/api/item",
    headers: authHeader()
});

itemAxios.interceptors.request.use(function (config) {
    config.headers = authHeader();
    return config;
});

const commentAxios = axios.create({
    baseURL: BASE_URL + "/api/comment",
    headers: authHeader()
});

commentAxios.interceptors.request.use(function (config) {
    config.headers = authHeader();
    return config;
});


const userAxios = axios.create({
    baseURL: BASE_URL + "/api/auth",
    headers: {
        "Content-type": "application/json"
    }
});


export { itemAxios, userAxios, commentAxios };