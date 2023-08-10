import React, { useState } from 'react';

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sortList = ['популярности', 'цене', 'алфавиту'];
  const [selectedSort, setSelectedSort] = useState(sortList[0]);

  const clickHandler = (sort) => {
    setSelectedSort(sort);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{selectedSort}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((sort) => (
              <li
                key={sort}
                className={sort === selectedSort ? 'active' : ''}
                onClick={() => clickHandler(sort)}>
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
