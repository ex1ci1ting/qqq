import React, { useEffect, useState } from "react";
import cls from "./EditQuestionPage.module.css";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../helpers/hooks/UseFetch";
import { API_URL } from "../../../constants";
import { Loader } from "../../components/Loader";
import { EditQuestion } from "./EditQuestion";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
    const responce = await fetch(`${API_URL}/react/${id}`);
    const data = await responce.json();
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      {isQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;
