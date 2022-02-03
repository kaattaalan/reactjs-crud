import axios from "axios";
import authHeader from './services/auth.header'

const BASE_URL = "http://localhost:8080"
const itemAxios = axios.create({
    baseURL: BASE_URL + "/items",
    headers: authHeader()
});

itemAxios.interceptors.request.use(function (config) {
    config.headers = authHeader();
    return config;
});


const userAxios = axios.create({
    baseURL: BASE_URL + "/api/auth",
    headers: {
        "Content-type": "application/json"
    }
});


export { itemAxios, userAxios };