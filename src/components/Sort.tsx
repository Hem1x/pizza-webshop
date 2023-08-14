import React, { useEffect, useRef, useState } from 'react';
import { setSort } from '../redux/slices/filterSlice';
import { useAppDispatch } from 'redux/hooks';

export const sortTypeList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'алфавиту (А-Я)', sortProperty: 'title' },
  { name: 'цене (сначала дорогие)', sortProperty: 'price' },
  { name: 'цене (сначала дешёвые)', sortProperty: '-price' },
];

interface ISort {
  name: string;
  sortProperty: string;
}

interface SortProps {
  sortType: ISort;
}

const Sort: React.FC<SortProps> = ({ sortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const clickHandler = (sort: ISort) => {
    dispatch(setSort({ name: sort.name, sortProperty: sort.sortProperty }));
    setIsOpen(false);
  };

  useEffect(() => {
    const hadleClickOutsite = (e: any) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutsite);

    return () => {
      document.body.removeEventListener('click', hadleClickOutsite);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
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
