import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducers';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const enhancer = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  return store;
};

export default configureStore;



// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authSlice from "./slices/auth";
//
// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
// });
//
// const persistedReducer = persistReducer(
//   {
//     key: "root",
//     version: 1,
//     storage: storage,
//   },
//   rootReducer
// );
//
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });
//
// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof rootReducer>;
//
// export default store;
