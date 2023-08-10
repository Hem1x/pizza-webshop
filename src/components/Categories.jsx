import React, { useState } from 'react';
import CategoriesItem from './CategoriesItem';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('Все');

  const categories = ['Все', 'Мясо', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];

  const clickHandler = (value) => {
    setActiveCategory(value);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <CategoriesItem
            key={category}
            name={category}
            clickHandler={clickHandler}
            activeIndex={activeCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
