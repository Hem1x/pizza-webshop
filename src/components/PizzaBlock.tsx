import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartById } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { Ipizza } from 'types';

interface SizeSelectorProps {
  pizza: Ipizza;
  pizzaState: {
    type: number;
    size: number;
  };
  setPizzaState: (update: { type: number; size: number }) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  pizza,
  pizzaState,
  setPizzaState,
}) => {
  return (
    <ul>
      {pizza.sizes.map((size) => (
        <li
          key={size}
          className={pizzaState.size === size ? 'active' : ''}
          onClick={() => setPizzaState({ ...pizzaState, size })}>
          {size} см.
        </li>
      ))}
    </ul>
  );
};

interface TypeSelectorProps extends SizeSelectorProps {
  typeName: string[];
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  pizza,
  pizzaState,
  setPizzaState,
  typeName,
}) => {
  return (
    <ul>
      {pizza.types.map((type) => (
        <li
          key={type}
          className={pizzaState.type === type ? 'active' : ''}
          onClick={() => setPizzaState({ ...pizzaState, type })}>
          {typeName[type]}
        </li>
      ))}
    </ul>
  );
};

const PizzaBlock: React.FC<{ pizza: Ipizza }> = ({ pizza }) => {
  const [pizzaState, setPizzaState] = React.useState({
    type: pizza.types[0],
    size: pizza.sizes[0],
  });

  const typeName = ['тонкое', 'традиционное'];

  const dispatch = useDispatch();
  const addedCount = useSelector(selectCartById(pizza));

  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: typeName[pizzaState.type],
      size: pizzaState.size,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`pizza/${pizza.id}`}>
          <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{pizza.title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <SizeSelector
            pizza={pizza}
            pizzaState={pizzaState}
            setPizzaState={setPizzaState}
          />
          <TypeSelector
            pizza={pizza}
            pizzaState={pizzaState}
            setPizzaState={setPizzaState}
            typeName={typeName}
          />
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount !== undefined && <i>{addedCount.count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;