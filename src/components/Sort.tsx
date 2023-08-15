import React, { useEffect, useRef, useState } from 'react';
import { setSort } from '../redux/slices/filter/filterSlice';
import { useAppDispatch } from 'redux/hooks';
import { ISort, SortTypeEnum } from 'types';

export const sortTypeList: ISort[] = [
  { name: 'популярности', sortProperty: SortTypeEnum.RATING },
  { name: 'алфавиту (А-Я)', sortProperty: SortTypeEnum.TITLE },
  { name: 'цене (сначала дорогие)', sortProperty: SortTypeEnum.PRICE_DESC },
  { name: 'цене (сначала дешёвые)', sortProperty: SortTypeEnum.PRICE_ASC },
];

interface SortProps {
  sortType: ISort;
}

type PopupClick = MouseEvent & {
  path: Node[];
};

export const Sort: React.FC<SortProps> = React.memo(({ sortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const clickHandler = (sort: ISort) => {
    dispatch(setSort({ name: sort.name, sortProperty: sort.sortProperty }));
    setIsOpen(false);
  };

  useEffect(() => {
    const hadleClickOutsite = (e: MouseEvent) => {
      const _e = e as PopupClick;
      if (sortRef.current && !_e.composedPath().includes(sortRef.current)) {
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
});
