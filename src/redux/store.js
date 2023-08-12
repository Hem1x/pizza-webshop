import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';

const rootReducer = combineReducers({
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
