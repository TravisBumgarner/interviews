import { combineReducers } from 'redux';

import all from './all';
import selected from './selected';


export default combineReducers({
  all,
  selected,
});
