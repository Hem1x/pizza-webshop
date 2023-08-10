import React from 'react';

const CategoriesItem = ({ name, value, activeIndex, clickHandler }) => {
  return (
    <li className={activeIndex === value ? 'active' : ''} onClick={() => clickHandler(value)}>
      {name}
    </li>
  );
};

export default CategoriesItem;
