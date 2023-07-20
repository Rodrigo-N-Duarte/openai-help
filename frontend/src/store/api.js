import axios from 'axios'
import {getCookie} from "@/utils/cookie";

export const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getCookie('jwt-token')}`
    }
});
