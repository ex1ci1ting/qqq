import React, { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { DelayFn } from "../../../helpers/DelayFn";
import { API_URL } from "../../../constants";
import { toast } from "react-toastify";
import { useFetch } from "../../../helpers/hooks/UseFetch";
import { useNavigate } from "react-router-dom";

const editCardAction = async (_prevState, formData) => {
  try {
    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;
    const questionId = newQuestion.questionId;
    await DelayFn();

    const responce = await fetch(`${API_URL}/react/${questionId}`, {
      method: "PATCH",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (responce.status === 404) {
      throw new Error(responce.status.text);
    }

    const question = responce.json();
    toast.success("New Question is successfully edited!");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
  }
};

export const EditQuestion = ({ initialState }) => {
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
    clearForm: false,
  });

  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });
    toast.success("New Question is successfully deleted!");
    navigate("/");
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?");
    isRemove && removeQuestion();
  };
  return (
    <>
      {(isPending || isQuestionRemoving) && <Loader />}
      <h1 className={cls.formTitle}> Edit Question</h1>
      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPending={isPending || isQuestionRemoving}
          submitBtnText="Add Question"
        />
        <button
          className={cls.close}
          disabled={isPending || isQuestionRemoving}
          onClick={onRemoveQuestionHandler}
        >
          X
        </button>
      </div>
    </>
  );
};
