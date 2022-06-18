import { combineReducers } from 'redux';

import { restCheckReducer as restCheck } from './rest_check';
import authSlice from "./slices/auth";

export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    // restCheck,
  });
