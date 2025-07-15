import React, { useEffect, useId, useState } from "react";
import cls from "./QuestionPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button";
import { useFetch } from "../../../helpers/hooks/UseFetch";
import { UseAuth } from "../../../helpers/hooks/UseAuth";

import { Loader, SmallLoader } from "../../components/Loader/Loader";
import { API_URL } from "../../../constants";

export const QuestionPage = () => {
  const checkboxId = useId();
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = UseAuth();

  const levelVariant = () =>
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  const completedVariant = () => (card.completed ? "success" : "primary");

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const responce = await fetch(`${API_URL}/react/${id}`);
    const data = await responce.json();

    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${card.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const data = await response.json();
    setCard(data); // Обновляем карточку данными с сервера
  });

  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level : {card.level}</Badge>
            <Badge variant={completedVariant()}>
              {card.completed ? "Completed" : "Not completed"}
            </Badge>
            {card?.editDate && (
              <p className={cls.editDate}>Edited: {card.editDate}</p>
            )}
          </div>
          <h5 className={cls.cardTitle}>{card.question}</h5>
          <div className={cls.cardAnswers}>
            <label htmlFor="">short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.labelForm}>
            <input
              type="checkbox"
              name=""
              id={checkboxId}
              className={cls.checkboxId}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>
          {isAuth && (
            <Button onClick={() => navigate(`/editquestions/${id}`)}>
              Edit Question
            </Button>
          )}

          <Button onClick={() => navigate("/")}>Back</Button>
        </div>
      )}
    </>
  );
};
