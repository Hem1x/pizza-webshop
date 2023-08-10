import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      fetch('https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza')
        .then((res) => res.json())
        .then((pizzas) => {
          setPizzas(pizzas);
          setIsLoading(false);
        });
    } catch (error) {
      return console.log(error);
    }
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(8)].map((item) => <PizzaLoaderBlock />)
            : pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
