import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';

const Categories = ({ selectedCategory, setCurrentPage }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];
  const dispatch = useDispatch();

  const clickHandler = (i) => {
    dispatch(setCategoryId(i));
    dispatch(setPageCount(1));
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
