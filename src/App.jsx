import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const App = () => {
  const [pizzas, setPizzas] = React.useState([
    { name: 'Мексиканская пицца', price: 390 },
    { name: 'Итальянская пицца', price: 510 },
    { name: 'Американская пицца', price: 470 },
    { name: 'Русская пицца', price: 490 },
  ]);

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
              <PizzaBlock key={pizza.name} pizza={pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
