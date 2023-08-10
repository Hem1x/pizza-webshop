import React from 'react';
import s from './NotFoundBlock.module.scss';

const index = () => {
  return (
    <div className={s.root}>
      <span>😓</span>
      <br />
      <h2>Ничего не найдено</h2>
      <p className={s.description}>К сожалению данная страница отсутствует</p>
    </div>
  );
};

export default index;
