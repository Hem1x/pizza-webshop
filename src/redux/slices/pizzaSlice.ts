import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'redux/store';
import { IUrl, Ipizza } from 'types';

export const getPizzas = createAsyncThunk<Ipizza[], IUrl>(
  'pizza/fetchPizzasStatus',
  async (params: IUrl) => {
    const { categoryURL, sortURL, searchURL, pageURL } = params;
    const { data } = await axios.get<Ipizza[]>(
      `https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza?${pageURL}&limit=4&${categoryURL}${sortURL}&${searchURL}`,
    );
    return data;
  },
);

enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzaState {
  pizzas: Ipizza[];
  status: string;
}

const initialState: PizzaState = {
  pizzas: [],
  status: StatusEnum.LOADING,
};

export const pizzaSlice = createSlice({
  name: '@@pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Ipizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPizzas.fulfilled, (state, action: PayloadAction<Ipizza[]>) => {
        state.status = StatusEnum.SUCCESS;
        state.pizzas = action.payload;
      })
      .addCase(getPizzas.pending, (state) => {
        state.status = StatusEnum.LOADING;
        state.pizzas = [];
      })
      .addCase(getPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR;
        state.pizzas = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
export const { setPizzas } = pizzaSlice.actions;
