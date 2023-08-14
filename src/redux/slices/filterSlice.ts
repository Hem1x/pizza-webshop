import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { IFilter, Ipizza } from 'types';

const initialState: IFilter = {
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
    setCategoryId(state, action: PayloadAction<Ipizza['category']>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<{ name: string; sortProperty: string }>) {
      state.sort = {
        name: action.payload.name,
        sortProperty: action.payload.sortProperty,
      };
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    clearFilters(state) {
      state.searchValue = '';
      state.categoryId = 0;
      state.pageCount = 1;
      state.sort['name'] = 'популярности';
      state.sort['sortProperty'] = 'rating';
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
export const {
  setCategoryId,
  setSort,
  setPageCount,
  setFilters,
  setSearchValue,
  clearFilters,
} = filterSlice.actions;
