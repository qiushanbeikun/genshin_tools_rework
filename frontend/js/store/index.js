
import {rootReducer} from './reducers';
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
  reducer: persistReducer({
      key: "root",
      version: 1,
      storage: storage,
    },
    rootReducer
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',})

export type RootState = ReturnType<typeof rootReducer>;
export const persist = persistStore(store)

export default store;
