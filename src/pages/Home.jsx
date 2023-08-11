import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categories
  const [categoryId, setCategoryId] = useState(0);

  // Sort
  const sortTypeList = [
    { name: 'популярности', sortProperty: 'rating&order=desc' },
    { name: 'алфавиту (А-Я)', sortProperty: 'title&order=asc' },
    { name: 'цене (сначала дешёвые)', sortProperty: 'price&order=asc' },
    { name: 'цене (сначала дорогие)', sortProperty: 'price&order=desc' },
  ];
  const [sortType, setSortType] = useState(0);

  // URL Parameters
  const categoryURL = categoryId !== 0 ? `category=${categoryId}&` : '';
  const sortURL = `sortBy=${sortTypeList[sortType].sortProperty}`;

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(`https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza?${categoryURL}${sortURL}`)
        .then((res) => res.json())
        .then((pizzas) => {
          setPizzas(pizzas);
          setIsLoading(false);
        });
    } catch (error) {
      return console.log(error);
    }
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={categoryId} onClickCategory={setCategoryId} />
        <Sort
          selectedSort={sortType}
          onClickSort={setSortType}
          sortTypeList={sortTypeList}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((item) => <PizzaLoaderBlock />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
      </div>
    </div>
  );
};

export default Home;
