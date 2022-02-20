// import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';

function fetchData(query, page, params) {

  const { API_KEY, image_type, orient, PER_PAGE } = params; 
  
  return fetch(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=${image_type}&orientation=${orient}&per_page=${PER_PAGE}`)
        .then(response => {
          if (response.ok) {
   
      return response.json();
    }

    return Promise.reject(new Error(`Sorry, no images with words ${query} found. Please, try again!' `));
  });
}

export default fetchData;


