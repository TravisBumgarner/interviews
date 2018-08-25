import questionActions from '../../actions';

const selectedId = (state = -1, action) => {
  switch (action.type) {
    case questionActions.GET_QUESTIONS_SUCCESS:
      // This could definitely be handled better in the future. Perhaps with some kind of
      // queue that keeps track of the next question.8
      return Object.values(action.data)[0].id;

    case questionActions.SET_SELECTED_QUESTION_ID:
      return action.id;

      default:
      return state;
  }
};

export default selectedId;
