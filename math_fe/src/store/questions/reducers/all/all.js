import questionActions from '../../actions';

const all = (state = {}, action) => {
  switch (action.type) {
    case questionActions.GET_QUESTIONS_SUCCESS:

      const newData = {}

      action.data.map(d => {
        newData[d.id] = d
      });

      return {
        ...state,
        ...newData,
      };
    default:
      return state;
  }
};

export default all;
