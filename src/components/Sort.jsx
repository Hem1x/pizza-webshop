import React, { useState } from 'react';

const Sort = ({ selectedSort, onClickSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortList = [
    'популярности',
    'алфавиту (А-Я)',
    'цене (сначала дешёвые)',
    'цене (сначала дорогие)',
  ];

  const clickHandler = (index) => {
    onClickSort(index);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortList[selectedSort]}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sort, i) => (
              <li
                key={sort}
                className={selectedSort === i ? 'active' : ''}
                onClick={() => clickHandler(i)}>
                {sort}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
