import axios from 'axios';

const BASE_URL = 'http://localhost:4000/media'; // Ajusta a tu puerto de NodeJs

export const getMedia = () => axios.get(BASE_URL);
export const createMedia = (data) => axios.post(BASE_URL, data);