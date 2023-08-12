import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

export const sortTypeList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'алфавиту (А-Я)', sortProperty: 'title' },
  { name: 'цене (сначала дорогие)', sortProperty: 'price' },
  { name: 'цене (сначала дешёвые)', sortProperty: '-price' },
];

const Sort = ({ sortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const clickHandler = (sort) => {
    dispatch(setSort({ name: sort.name, sortProperty: sort.sortProperty }));
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortTypeList.map((sort) => (
              <li
                key={sort.name}
                className={sortType.name === sort.name ? 'active' : ''}
                onClick={() => clickHandler(sort)}>
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
