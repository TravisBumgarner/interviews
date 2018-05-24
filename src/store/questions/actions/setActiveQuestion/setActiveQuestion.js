import requestActions from "../../../request/actions/";

export const SET_ACTIVE_QUESTION_SUCCESS = 'SET_ACTIVE_QUESTION_SUCCESS';

export const setActiveQuestionSuccess = (id) => ({
  type: SET_ACTIVE_QUESTION_SUCCESS,
  id,
});

export const setActiveQuestion = (id) => {
  return (dispatch) => {
    dispatch(setActiveQuestionSuccess(id));
  };
};
