import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearItems(state, action) {
      state.items = [];
    },
    decreaseAmount(state, action) {
      const fintItem = state.items.find((obj) => obj.id === action.payload);

      fintItem.count--;

      if (fintItem.count === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearItems, decreaseAmount } = cartSlice.actions;
