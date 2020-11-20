import axios from "axios";
import authHeader from './services/auth.header'

export default axios.create({
    baseURL: "http://localhost:3000/items",
    headers: authHeader()
});

export const userAxios = axios.create({
    baseURL: "http://localhost:3000/user",
    headers: {
        "Content-type": "application/json"
    }
});