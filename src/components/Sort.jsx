import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';

const Sort = ({ sortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const sortTypeList = [
    { name: 'популярности', sortProperty: 'rating&order=desc&' },
    { name: 'алфавиту (А-Я)', sortProperty: 'title&order=asc&' },
    { name: 'цене (сначала дешёвые)', sortProperty: 'price&order=asc' },
    { name: 'цене (сначала дорогие)', sortProperty: 'price&order=desc&' },
  ];

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
