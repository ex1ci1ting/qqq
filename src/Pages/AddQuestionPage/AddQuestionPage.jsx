import React from "react";
import cls from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { DelayFn } from "../../../helpers/DelayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

const createCardAction = async (_prevState, formData) => {
  const newQuestions = Object.fromEntries(formData);
  const resources = newQuestions.resources.trim();
  const isClearForm = newQuestions.clearForm;

  try {
    await DelayFn();
    const responce = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestions.question,
        answer: newQuestions.answer,
        description: newQuestions.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestions.level),
        completed: false,
        editDate: undefined,
      }),
    });

    const question = responce.json();
    toast.success("New Question is successfully created!");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}> Add Question</h1>
      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPending={isPending}
          submitBtnText="Add Question"
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
