import { combineReducers } from 'redux';

import all from './all';
import selectedId from './selectedId';
import meta from './meta';

export default combineReducers({
  all,
  selectedId,
  meta,
});
