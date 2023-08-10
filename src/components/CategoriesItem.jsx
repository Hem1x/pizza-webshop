import React from 'react';

const CategoriesItem = ({ name, activeIndex, clickHandler }) => {
  return (
    <li
      className={activeIndex === name ? 'active' : ''}
      onClick={() => clickHandler(name)}>
      {name}
    </li>
  );
};

export default CategoriesItem;
