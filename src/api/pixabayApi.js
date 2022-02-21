import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const instance = axios.create({
    baseURL: "https://pixabay.com/api"})

const fetchData = async (query, page, params) => {

  const { API_KEY, image_type, orient, PER_PAGE } = params; 

  const { data } = await instance.get(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=${image_type}&orientation=${orient}&per_page=${PER_PAGE}`);
  return data;
  }

export default fetchData;


