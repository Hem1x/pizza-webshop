import React, { useState, useEffect } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const App = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    try {
      fetch('https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza')
        .then((res) => res.json())
        .then((pizzas) => setPizzas(pizzas));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
