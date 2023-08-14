import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { categoryURL, sortURL, searchURL, pageURL } = params;
  const { data } = await axios.get(
    `https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza?${pageURL}&limit=4&${categoryURL}${sortURL}&${searchURL}`,
  );
  return data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: '@@pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [getPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.pizzas = action.payload;
    },
    [getPizzas.pending]: (state, action) => {
      state.status = 'loading';
      state.pizzas = [];
    },
    [getPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    },
  },
});

export const selectPizzas = (state) => state.pizza;

export default pizzaSlice.reducer;
export const { setPizzas } = pizzaSlice.actions;
