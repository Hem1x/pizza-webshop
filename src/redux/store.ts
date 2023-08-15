import { AnyAction, Dispatch, Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzaSlice';

const localStorageMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    next(action);
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  };

const savedState = localStorage.getItem('reduxState');
const preloadedState = savedState ? JSON.parse(savedState) : undefined;

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizza: pizzaReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
