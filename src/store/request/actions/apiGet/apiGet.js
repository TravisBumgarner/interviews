import axios from 'axios';

const apiGet = (endpoint, data = {}) => {
  return axios.request({
    method: 'GET',
    url: `http://eng40api.travisbumgarner.com${endpoint}`,
    data,
  })
};

export default apiGet;

