import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortTypeList } from '../components/Sort';
import PizzaLoaderBlock from '../components/PizzaLoaderBlock';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

import { useDebounce } from '../hooks/debounce';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { getPizzas, selectPizzas } from '../redux/slices/pizzaSlice';
import { IUrl, Ipizza } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { pizzas, status } = useAppSelector(selectPizzas);
  const { searchValue } = useAppSelector((state) => state.filter);
  const { categoryId, sort, pageCount } = useAppSelector(selectFilter);

  const debounced = useDebounce(searchValue, 500);

  // URL
  const urlParams: IUrl = {
    categoryURL: categoryId !== 0 ? `category=${categoryId}&` : '',
    sortURL: sort
      ? `sortBy=${sort.sortProperty.replace('-', '')}${
          sort.sortProperty.startsWith('-') ? '&order=asc' : '&order=desc'
        }`
      : '',
    searchURL: debounced ? `search=${debounced}` : '',
    pageURL: categoryId === 0 ? `page=${pageCount}` : '',
  };

  // Fetch PIZZA
  const fetchPizzas = async () => {
    try {
      dispatch(getPizzas(urlParams));
    } catch (error) {
      console.log((error as Error).message);
    }

    // window.scrollTo(0, 0);
  };

  // Parse URL
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortProperty = params.sort as string | undefined;
      const pageCount = Number(params.pageCount);
      const categoryId = Number(params.categoryId);

      const sort = sortTypeList.find((obj) => obj.sortProperty === sortProperty);

      if (sort) {
        dispatch(setFilters({ sort, categoryId, pageCount }));
        isSearch.current = true;
      }
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [debounced, categoryId, sort?.sortProperty, pageCount]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [debounced, categoryId, sort.sortProperty, pageCount, navigate]);

  const skeletons = [...new Array(8)].map((item, i) => <PizzaLoaderBlock key={i} />);
  const pizzasList = pizzas.map((pizza: Ipizza) => <PizzaBlock key={pizza.id} pizza={pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedCategory={categoryId} />
        <Sort sortType={sort} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      {categoryId === 0 && <Pagination />}

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
