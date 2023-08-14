import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { greyArrowLeft } from '../assets';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza/${id}`,
        );
        setPizza(data);
      } catch (error) {
        return <h1>Load error</h1>;
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Загрузка...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/">
        <img width={10} src={greyArrowLeft} alt="back" />
      </Link>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div style={{ marginRight: 40 }}>
          {' '}
          <img width={400} src={pizza.imageUrl} alt="" />
        </div>
        <div>
          {' '}
          <h1 style={{ fontWeight: 900, fontSize: 28, marginBottom: 10 }}>
            {pizza.title}
          </h1>
          <h2 style={{ fontSize: 20 }}>{pizza.price} RUB</h2>
          <br />
          <p style={{ maxWidth: 700 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            exercitationem modi eos non, inventore maiores voluptatem repellat. Mollitia
            vel sed deleniti. Fuga debitis fugit ipsam, veritatis architecto aliquid
            dignissimos repellat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
