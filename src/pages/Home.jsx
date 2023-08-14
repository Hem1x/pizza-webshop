import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypeList } from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../hooks/debounce';
import { selectFilter, setFilters, setPageCount } from '../redux/slices/filterSlice';
import { getPizzas, selectPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useSelector((state) => state.filter);

  const debounced = useDebounce(searchValue, 500);

  const { categoryId, sort, pageCount } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzas);

  const fetchPizzas = async () => {
    try {
      dispatch(
        getPizzas({
          categoryURL: categoryId !== 0 ? `category=${categoryId}&` : '',
          sortURL: `sortBy=${sort.sortProperty.replace('-', '')}${
            sort.sortProperty.startsWith('-') ? '&order=asc' : '&order=desc'
          }`,
          searchURL: debounced ? `search=${debounced}` : '',
          pageURL: categoryId === 0 ? `page=${pageCount}` : '',
        }),
      );
    } catch (error) {
      console.log(error.message);
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
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [debounced, categoryId, sort.sortProperty, pageCount]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        category: categoryId,
        page: pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [debounced, categoryId, sort.sortProperty, pageCount, navigate]);

  const skeletons = [...new Array(8)].map((item, i) => <PizzaLoaderBlock key={i} />);
  const pizzasList = pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={categoryId} />
        <Sort sortType={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {categoryId === 0 && pizzas.length > 3 && (
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
