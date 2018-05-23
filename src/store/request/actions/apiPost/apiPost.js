import axios from 'axios';

export const API_POST_START = 'API_POST_START';
export const API_POST_SUCCESS = 'API_POST_SUCCESS';
export const API_POST_FAILURE = 'API_POST_FAILURE';

export const apiPostStart = () => ({
  type: API_POST_START,
});

export const apiPostSuccess = detail => ({
  type: API_POST_SUCCESS,
  detail,
});

export const apiPostFailure = detail => ({
  type: API_POST_FAILURE,
  detail,
});

export const apiPost = (endpoint, data = {}) => {
  return (dispatch) => {
    dispatch(apiPostStart());
    return new Promise((resolve, reject) => {
      axios.request({
        method: 'POST',
        url: `http://eng40api.travisbumgarner.com${endpoint}`,
        data,
      }).then((response) => {
        const { data } = response;
        if (data.is_submit_error){
          dispatch(apiPostFailure(data.detail));
          reject();
        } else {
        dispatch(apiPostSuccess(data.detail));
        resolve();
        }
      }).catch((error) => {
        dispatch(apiPostFailure('There was an error, please try again later.'));
        reject();
      });
    });
  };
};



