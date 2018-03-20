import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const apiRequest = (method, endpoint, data = {}) => {
  axios.request({
    method,
    url: API_URL + endpoint,
    data,
  }).then(r => console.log(r)).catch(e => console.log(e));
};

export {
  apiRequest,
}
