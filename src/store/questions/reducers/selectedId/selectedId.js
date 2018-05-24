import questionActions from '../../actions';

const selectedId = (state = 2, action) => {
  switch (action.type) {
    case questionActions.SET_SELECTED_QUESTION_ID:
      return {
        ...action.id
      };
    default:
      return state;
  }
};

export default selectedId;
