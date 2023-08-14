import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    clearFilters(state, action) {
      state.searchValue = '';
      state.categoryId = 0;
      state.pageCount = 1;
      state.sort['name'] = 'популярности';
      state.sort['sortProperty'] = 'rating';
    },
  },
});

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
export const {
  setCategoryId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
  clearFilters,
} = filterSlice.actions;
