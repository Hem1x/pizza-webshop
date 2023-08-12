import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { useSelector } from 'react-redux';

const Home = ({ searchValue }) => {
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const categoryURL = categoryId !== 0 ? `category=${categoryId}&` : '';
    const sortURL = `sortBy=${sort.sortProperty}`;
    const searchURL = searchValue ? `search=${searchValue}` : '';
    const pageURL = categoryId === 0 ? `page=${currentPage}` : '';
    fetch(
      `https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza?${pageURL}&limit=4&${categoryURL}${sortURL}${searchURL}`,
    )
      .then((res) => res.json())
      .then((pizzas) => {
        setPizzas(pizzas);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [searchValue, categoryId, sort.sortProperty, currentPage]);

  const skeletons = [...new Array(8)].map((item, i) => <PizzaLoaderBlock key={i} />);
  const pizzasList = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={categoryId} setCurrentPage={setCurrentPage} />
        <Sort sortType={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {categoryId === 0 && (
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      )}

      <div className="content__items">
        {isLoading && skeletons}
        {pizzasList.length > 0 ? pizzasList : <h3>Нет такой пиццы</h3>}
      </div>
    </div>
  );
};

export default Home;
