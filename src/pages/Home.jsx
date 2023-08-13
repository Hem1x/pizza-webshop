import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypeList } from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../hooks/debounce';
import { setFilters, setPageCount } from '../redux/slices/filterSlice';
import { getPizzas } from '../redux/slices/pizzaSlice';

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const debounced = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);
  const { pizzas, status } = useSelector((state) => state.pizza);

  const fetchPizzas = async () => {
    setIsLoading(true);
    const categoryURL = categoryId !== 0 ? `category=${categoryId}&` : '';
    const sortURL = `sortBy=${sort.sortProperty.replace('-', '')}${
      sort.sortProperty.startsWith('-') ? '&order=asc' : '&order=desc'
    }`;
    const searchURL = debounced ? `search=${debounced}` : '';
    const pageURL = categoryId === 0 ? `page=${pageCount}` : '';

    try {
      dispatch(
        getPizzas({
          categoryURL,
          sortURL,
          searchURL,
          pageURL,
        }),
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTypeList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [debounced, categoryId, sort.sortProperty, pageCount]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [debounced, categoryId, sort.sortProperty, pageCount]);

  const skeletons = [...new Array(8)].map((item, i) => <PizzaLoaderBlock key={i} />);
  const pizzasList = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={categoryId} />
        <Sort sortType={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {categoryId === 0 && (
        <Pagination onChangePage={(number) => dispatch(setPageCount(number))} />
      )}

      <div className="content__items">
        {status === 'loading' && skeletons}
        {status === 'success' && pizzasList}
      </div>

      {status === 'error' && (
        <h3 style={{ display: 'flex', justifyContent: 'center', margin: '4rem' }}>
          Произошла ошибка. Питса отсутствует. 😓
        </h3>
      )}

      {status === 'success' && pizzasList.length === 0 && (
        <h2 style={{ display: 'flex', justifyContent: 'center', margin: '4rem' }}>
          Мы не нашли такой пиццы 😓
        </h2>
      )}
    </div>
  );
};

export default Home;
