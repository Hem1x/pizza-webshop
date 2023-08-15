import React from 'react';
import s from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <span>😓</span>
      <br />
      <h2>Ничего не найдено</h2>
      <p className={s.description}>К сожалению данная страница отсутствует</p>
    </div>
  );
};
