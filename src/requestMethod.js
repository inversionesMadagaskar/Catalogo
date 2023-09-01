import axios from 'axios';

const BASE_URL = "https://apimadagaskar-b588-dev.fl0.io/api/";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});