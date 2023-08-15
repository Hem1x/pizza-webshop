import React, { useRef, useState } from 'react';
import s from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filter/filterSlice';
import { useAppDispatch } from 'redux/hooks';

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onCLickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    if (inputRef) {
      inputRef.current?.focus();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(setSearchValue(value));
  };

  return (
    <div className={s.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={s.icon}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        ref={inputRef}
        className={s.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={handleOnChange}
      />
      {value.length !== 0 && (
        <svg
          onClick={onCLickClear}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={s.closeIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
};
