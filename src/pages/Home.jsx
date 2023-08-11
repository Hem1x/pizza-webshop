import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories
  const [categoryId, setCategoryId] = useState(0);

  // Sort
  const sortTypeList = [
    { name: 'популярности', sortProperty: 'rating&order=desc&' },
    { name: 'алфавиту (А-Я)', sortProperty: 'title&order=asc&' },
    { name: 'цене (сначала дешёвые)', sortProperty: 'price&order=asc' },
    { name: 'цене (сначала дорогие)', sortProperty: 'price&order=desc&' },
  ];
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    try {
      setIsLoading(true);
      const categoryURL = categoryId !== 0 ? `category=${categoryId}&` : '';
      const sortURL = `sortBy=${sortTypeList[sortType].sortProperty}`;
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
    } catch (error) {
      return console.log(error);
    }
    window.scrollTo(0, 0);
  }, [searchValue, categoryId, sortType, currentPage]);

  const skeletons = [...new Array(8)].map((item, i) => <PizzaLoaderBlock key={i} />);
  const pizzasList = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          selectedCategory={categoryId}
          onClickCategory={setCategoryId}
          setCurrentPage={setCurrentPage}
        />
        <Sort
          selectedSort={sortType}
          onClickSort={setSortType}
          sortTypeList={sortTypeList}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading && skeletons}
        {pizzasList.length > 0 ? pizzasList : <h3>Нет такой пиццы</h3>}
      </div>
      {categoryId === 0 && (
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      )}
    </div>
  );
};

export default Home;
