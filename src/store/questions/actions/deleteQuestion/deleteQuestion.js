import requestActions from "../../../request/actions/";

export const DELETE_QUESTION_START = 'DELETE_QUESTION_START';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';

export const deleteQuestionStart = () => ({
  type: DELETE_QUESTION_START,
});

export const deleteQuestionSuccess = data => ({
  type: DELETE_QUESTION_SUCCESS,
  data,
});

export const deleteQuestionFailure = data => ({
  type: DELETE_QUESTION_FAILURE,
  data,
});

export const deleteQuestion = (params) => {
  console.log(requestActions);
  return (dispatch) => {
    dispatch(deleteQuestionStart());
    return new Promise((resolve, reject) => {
      requestActions.apiRequest('DELETE', 'questions', params).then((response) => {
        const { data } = response;
        alert(data);
        dispatch(deleteQuestionSuccess(data));
        resolve();
      }).catch((error) => {
        dispatch(deleteQuestionFailure(error));
        reject();
      });
    });
  };
};
