import axios from 'axios';

const BASE_URL = "https://apimadagaskar-dev-dzpz.1.ie-1.fl0.io/api/";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});