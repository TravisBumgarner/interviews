import measurementActions from '../../actions';

const all = (state = [], action) => {
  switch (action.type) {
    case measurementActions.GET_MEASUREMENTS_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};

export default all;
