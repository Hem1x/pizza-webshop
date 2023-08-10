import React from 'react';
import { greyArrowLeft } from '../assets';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div>
      <Link to="/">
        <img src={greyArrowLeft} alt="" />
      </Link>

      <h1>Корзина</h1>
    </div>
  );
};

export default Cart;
