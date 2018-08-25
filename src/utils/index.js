import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const apiRequest = (method, endpoint, data = {}) => {
  return axios.request({
    method,
    url: API_URL + endpoint,
    data,
  });
};

export {
  apiRequest,
}
