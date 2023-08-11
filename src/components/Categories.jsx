import React from 'react';

const Categories = ({ selectedCategory, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            className={selectedCategory === i ? 'active' : ''}
            onClick={() => onClickCategory(i)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
