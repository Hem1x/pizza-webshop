import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ipizza } from 'types';
import { getPizzas } from './pizzaAsync';

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

export default pizzaSlice.reducer;
export const { setPizzas } = pizzaSlice.actions;
