import questionActions from '../../actions';

const selected = (state = {}, action) => {
  switch (action.type) {
    case questionActions.GET_SELECTED_QUESTIONS_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default selected;
