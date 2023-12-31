import React from 'react';
import s from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useAppDispatch } from 'redux/hooks';
import { setPageCount } from 'redux/slices/filter/filterSlice';

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <ReactPaginate
      className={s.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => dispatch(setPageCount(e.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
