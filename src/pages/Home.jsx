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

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const debounced = useDebounce(searchValue, 500);
  const [isLoading, setIsLoading] = useState(true);

  const [pizzas, setPizzas] = useState([]);

  const { categoryId, sort } = useSelector((state) => state.filter);
  const currentPage = useSelector((state) => state.filter.pageCount);

  const fetchPizzas = () => {
    setIsLoading(true);
    const categoryURL = categoryId !== 0 ? `category=${categoryId}&` : '';
    const sortURL = `sortBy=${sort.sortProperty.replace('-', '')}${
      sort.sortProperty.startsWith('-') ? '&order=asc' : '&order=desc'
    }`;
    const searchURL = debounced ? `search=${debounced}` : '';
    const pageURL = categoryId === 0 ? `page=${currentPage}` : '';
    axios
      .get(
        `https://64b519e9f3dbab5a95c6b423.mockapi.io/pizza?${pageURL}&limit=4&${categoryURL}${sortURL}&${searchURL}`,
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });
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
  }, [debounced, categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [debounced, categoryId, sort.sortProperty, currentPage]);

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
        {isLoading && skeletons}
        {pizzasList.length > 0 && pizzasList}
      </div>

      {pizzasList.length === 0 && (
        <h3 style={{ display: 'flex', justifyContent: 'center', margin: '4rem' }}>
          У нас нет пиццы по вашему запросу "{searchValue}"
        </h3>
      )}
    </div>
  );
};

export default Home;
