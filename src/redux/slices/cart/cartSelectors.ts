import { RootState } from 'redux/store';
import { ICartItem, Ipizza } from 'types';

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (pizza: Ipizza) => (state: RootState) =>
  state.cart.items.find((obj: ICartItem) => obj.id === pizza.id);
