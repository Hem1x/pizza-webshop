import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem, Ipizza } from 'types';
import { RootState } from 'redux/store';

const initialState: { items: ICartItem[] } = {
  items: [],
};

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem?.count) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem(state, action: PayloadAction<Pick<ICartItem, 'id' | 'price'>>) {
      state.items = state.items.filter((item: ICartItem) => item.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
    },
    decreaseAmount(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem?.count) {
        findItem.count--;
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (pizza: Ipizza) => (state: RootState) =>
  state.cart.items.find((obj: ICartItem) => obj.id === pizza.id);

export default cartSlice.reducer;
export const { addItem, removeItem, clearItems, decreaseAmount } = cartSlice.actions;
