import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  pageCount: 1,
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
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export default filterSlice.reducer;
export const { setCategoryId, setSort, setPageCount, setFilters } = filterSlice.actions;
