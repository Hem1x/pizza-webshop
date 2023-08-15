import React from 'react';
import { setCategoryId, setPageCount } from '../redux/slices/filter/filterSlice';
import { Ipizza } from 'types';
import { useAppDispatch } from 'redux/hooks';

interface CategoriesProps {
  selectedCategory: Ipizza['category'];
}

const Categories: React.FC<CategoriesProps> = React.memo(({ selectedCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острая', 'Закрытая'];
  const dispatch = useAppDispatch();

  const clickHandler = (i: Ipizza['category']) => {
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
});

export default Categories;
