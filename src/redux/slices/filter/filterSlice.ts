import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilter, ISort, Ipizza, SortTypeEnum } from 'types';

const initialState: IFilter = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortTypeEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: '@@filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<Ipizza['category']>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<ISort>) {
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
    setFilters(state, action: PayloadAction<Omit<IFilter, 'searchValue'>>) {
      state.pageCount = action.payload.pageCount;
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
    clearFilters(state) {
      state.searchValue = '';
      state.categoryId = 0;
      state.pageCount = 1;
      state.sort.name = 'популярности';
      state.sort.sortProperty = SortTypeEnum.RATING;
    },
  },
});

export default filterSlice.reducer;
export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue, clearFilters } =
  filterSlice.actions;
