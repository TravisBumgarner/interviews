import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import questions from './questions/reducers';

const rootReducer = combineReducers({
  questions,
});

let middleware = [ReduxThunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
    duration: true,
  });
  middleware.push(logger)

}

// logger must be the last middleware in chain, otherwise
// it will log thunk and promise, not actual actions
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

export default store;
