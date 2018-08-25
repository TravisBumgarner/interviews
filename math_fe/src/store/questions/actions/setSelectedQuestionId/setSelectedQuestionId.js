import requestActions from "../../../request/actions/";

export const SET_SELECTED_QUESTION_ID = 'SET_SELECTED_QUESTION_ID';

export const setSelectedQuestionIdSuccess = (id) => ({
  type: SET_SELECTED_QUESTION_ID,
  id,
});

export const setSelectedQuestionId = (id) => {
  return (dispatch) => {
    dispatch(setSelectedQuestionIdSuccess(id));
  };
};
