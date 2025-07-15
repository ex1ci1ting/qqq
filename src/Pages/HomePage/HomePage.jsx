import React, { useEffect, useRef, useState, useMemo } from "react";
import { QuestionCardList } from "../../components/QuestionCardList/QuestionCardList";
import { API_URL } from "../../../constants/index";
import { Loader } from "../../components/Loader/Loader";
import { DelayFn } from "../../../helpers/DelayFn";
import { useFetch } from "../../../helpers/hooks/UseFetch";
import cls from "./HomePage.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// Константы
const DEFAULT_PER_PAGE = 10;

/**
 * Главная страница приложения - отображает список вопросов с возможностью
 * поиска, сортировки и пагинации
 */
export const HomePage = () => {
  //=============================================
  // Состояния компонента
  //=============================================
  const [questions, setQuestions] = useState({}); // Данные вопросов с сервера
  const [searchValue, setsearchValue] = useState(""); // Значение поискового запроса
  const [sortSelectValue, setSortSelectValue] = useState(""); // Значение сортировки
  const [countSelectValue, setCountSelectValue] = useState(""); // Значение сортировки
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`
  ); // Параметры запроса
  const controlRef = useRef();

  // Получение номера активной страницы
  const getActivePageNumber = () =>
    questions.next === null ? questions.last : questions.next - 1;

  //=============================================
  // Запросы данных
  //=============================================
  const [getQuestions, isLoading] = useFetch(async (url) => {
    const responce = await fetch(`${API_URL}/${url}`);
    const questions = await responce.json();
    setQuestions(questions);
    return questions;
  });

  // Эффект для загрузки вопросов при изменении параметров поиска
  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  //=============================================
  // Обработчики событий
  //=============================================
  const changeInputHandler = (e) => {
    setsearchValue(e.target.value);
    console.log(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    console.log(e.target.value);
    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`
      );
      controlRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  //=============================================
  // Мемоизированные значения
  //=============================================
  const filteredCards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) =>
          d.question.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, index) => index + 1);
  }, [questions]);

  //=============================================
  // Рендер компонента
  //=============================================
  return (
    <>
      {/* Блок управления: поиск и сортировка */}
      <div className={cls.controlsContainer} ref={controlRef}>
        <Input value={searchValue} onChange={changeInputHandler} />

        <select
          name=""
          id=""
          className={cls.select}
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
        >
          <option disabled value="">
            sort by
          </option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed asc</option>
          <option value="_sort=-completed">completed desc</option>
        </select>
        <select
          name=""
          id=""
          className={cls.select}
          value={countSelectValue}
          onChange={onCountSelectChangeHandler}
        >
          <option disabled value="">
            count
          </option>
          <hr />
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </div>

      {/* Индикатор загрузки */}
      {isLoading && <Loader />}

      {/* Список вопросов */}
      <QuestionCardList cards={filteredCards} />

      {/* Пагинация или сообщение об отсутствии данных */}
      {filteredCards.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : (
        <div className={cls.paginationContainer} onClick={paginationHandler}>
          {pagination.map((value) => {
            return (
              <Button isActive={value === getActivePageNumber()} key={value}>
                {value}
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
