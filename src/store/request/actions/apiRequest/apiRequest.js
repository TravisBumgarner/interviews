import axios from 'axios';

import { API_URL } from "../../../../../constants";

export const API_REQUEST_START = 'API_REQUEST_START';
export const API_REQUEST_SUCCESS = 'API_REQUEST_SUCCESS';
export const API_REQUEST_FAILURE = 'API_REQUEST_FAILURE';

export const apiRequestStart = () => ({
  type: API_REQUEST_START,
});

export const apiRequestSuccess = detail => ({
  type: API_REQUEST_SUCCESS,
  detail,
});

export const apiRequestFailure = detail => ({
  type: API_REQUEST_FAILURE,
  detail,
});

// export const apiRequest = (method, endpoint, data = {}) => {
//   return (dispatch) => {
//     dispatch(apiRequestStart());
//     return new Promise((resolve, reject) => {
//       axios.request({
//         method,
//         url: `${API_URL}${endpoint}`,
//         data,
//       }).then((response) => {
//         const { data } = response;
//         if (data.is_submit_error){
//           dispatch(apiRequestFailure(data));
//           reject();
//         } else {
//         dispatch(apiRequestSuccess(data));
//         resolve();
//         }
//       }).catch((error) => {
//         dispatch(apiRequestFailure('There was an error, please try again later.'));
//         reject();
//       });
//     });
//   };
// };

export const apiRequest = (method, endpoint, data = {}) => {
  // These could be split out into separate functions for simplication.
  if (method === 'GET'){
    return axios.get(`${API_URL}${endpoint}`, { params: data });
  } else if (method === 'POST'){
    return axios.post(`${API_URL}${endpoint}`, data);
  }
};


