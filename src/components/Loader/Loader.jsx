import React from "react";
import cls from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <span className={cls.loader}></span>
    </div>
  );
};

// Измените на компонент с большой буквы
export const SmallLoader = () => {
  return <div className={cls.smallLoader}></div>;
};

// Удалите дублирующий экспорт в конце файла
