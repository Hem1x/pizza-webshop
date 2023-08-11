import React from 'react';

const Categories = ({ selectedCategory, onClickCategory, setCurrentPage }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

  const clickHandler = (i) => {
    onClickCategory(i);
    setCurrentPage(1);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category}
            className={selectedCategory === i ? 'active' : ''}
            onClick={() => clickHandler(i)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
