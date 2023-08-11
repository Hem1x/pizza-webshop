import React, { useState } from 'react';

const Sort = ({ selectedSort, onClickSort, sortTypeList }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = (index) => {
    onClickSort(index);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sortTypeList[selectedSort].name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortTypeList.map((sort, i) => (
              <li
                key={sort.name}
                className={selectedSort === i ? 'active' : ''}
                onClick={() => clickHandler(i)}>
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
