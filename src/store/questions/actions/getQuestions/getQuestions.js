import requestActions from "../../../request/actions/";

export const GET_QUESTIONS_START = 'GET_QUESTIONS_START';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILURE = 'GET_QUESTIONS_FAILURE';

export const getQuestionsStart = () => ({
  type: GET_QUESTIONS_START,
});

export const getQuestionsSuccess = data => ({
  type: GET_QUESTIONS_SUCCESS,
  data,
});

export const getQuestionsFailure = data => ({
  type: GET_QUESTIONS_FAILURE,
  data,
});

export const getQuestions = (params) => {
  console.log(requestActions);
  return (dispatch) => {
    dispatch(getQuestionsStart());
    return new Promise((resolve, reject) => {
      requestActions.apiRequest('GET', 'questions', params).then((response) => {
        const { data } = response;
        console.log(data);
        dispatch(getQuestionsSuccess(data));
        resolve();
      }).catch((error) => {
        dispatch(getQuestionsFailure(error));
        reject();
      });
    });
  };
};
