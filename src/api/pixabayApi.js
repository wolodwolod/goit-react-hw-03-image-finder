import axios from 'axios';


const instance = axios.create({
  baseURL: "https://pixabay.com/api",
  params: {
    key: '25433386-4f25aa275c005ef248c74251b',
    image_type: 'photo',
    orientation: 'horizontal',
    }
})

const fetchData = async (q= '', page = 1, per_page) => {
const {data} = await instance.get("/", {
  params: {
    q,
    page,
    per_page
          }
});
  console.log(page, q, per_page)
  
  return data;    
  }

export default fetchData;


