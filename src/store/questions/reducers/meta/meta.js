import questionActions from '../../actions';

const defaultState = {
  isLoading: false,
  doQuestionsExist: false,
};

const all = (state = defaultState, action) => {
  switch (action.type) {
    case questionActions.GET_QUESTIONS_START:
      return {
        ...state,
        isLoading: true,
      };

    case questionActions.GET_QUESTIONS_SUCCESS:
      return {
        isLoading: false,
        doQuestionsExist: true,
      };

    default:
      return state;
  }
};

export default all;
