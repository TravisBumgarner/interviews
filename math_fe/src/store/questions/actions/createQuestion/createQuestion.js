import requestActions from "../../../request/actions/";

export const CREATE_QUESTION_START = 'CREATE_QUESTION_START';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';

export const createQuestionStart = () => ({
  type: CREATE_QUESTION_START,
});

export const createQuestionSuccess = data => ({
  type: CREATE_QUESTION_SUCCESS,
  data,
});

export const createQuestionFailure = data => ({
  type: CREATE_QUESTION_FAILURE,
  data,
});

export const createQuestion = (params) => {
  console.log(requestActions);
  return (dispatch) => {
    dispatch(createQuestionStart());
    return new Promise((resolve, reject) => {
      requestActions.apiRequest('POST', 'questions', params).then((response) => {
        const { data } = response;
        alert(data);
        dispatch(createQuestionSuccess(data));
        resolve();
      }).catch((error) => {
        dispatch(createQuestionFailure(error));
        reject();
      });
    });
  };
};
