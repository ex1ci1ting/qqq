import React, { useEffect, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../../constants/index";

const cards = [];

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const responce = await fetch(`${API_URL}/react`);
      const questions = await responce.json();
      setQuestions(questions);
    } catch (error) {}
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {questions.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </>
  );
};
