import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: '@@filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = {
        name: action.payload.name,
        sortProperty: action.payload.sortProperty,
      };
    },
  },
});

export default filterSlice.reducer;
export const { setCategoryId, setSort } = filterSlice.actions;
