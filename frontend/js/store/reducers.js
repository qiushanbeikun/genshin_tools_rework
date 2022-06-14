import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { restCheckReducer as restCheck } from './rest_check';
import authSlice from "./slices/auth";

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth: authSlice.reducer,
    restCheck,
  });
};
