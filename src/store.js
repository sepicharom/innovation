/**
 * @module  src/store
 * @author  samanthasalley
 * @description Redux 'single source of truth' -- constructed from reducers.
 * This is also where we drop in middleware (devtools, redux-thunk, etc)
 * @exports store
 */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/';

// thunk: allows us to return a function instead of an action
// add any additional custom middleware here
const middleware = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;