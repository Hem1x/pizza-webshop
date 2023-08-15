import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
