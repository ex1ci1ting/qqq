import React from "react";
import cls from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { DelayFn } from "../../../helpers/DelayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants";
import { Loader } from " ../../components/Loader";

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
  const [formState, formActionState, isPending] = useActionState(
    createCardAction,
    { clearForm: true }
  );
  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}> Add Question</h1>
      <div className={cls.formContainer}>
        <form action={formActionState} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question :</label>
            <textarea
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="please enter question"
              defaultValue={"defaultValue"}
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="answerField">Short Answer :</label>
            <textarea
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="please enter a short answer"
              defaultValue={"defaultValue"}
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="descriptionField">Description</label>
            <textarea
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="please enter a full description"
              defaultValue={"defaultValue"}
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="resourcesField">Resources</label>
            <textarea
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="please enter a full description"
              defaultValue={"defaultValue"}
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="levelField">Level</label>
            <select name="level" id="levelField">
              <option disabled value="">
                Question Level
              </option>
              <hr />
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              className={cls.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>clear form after submitting ?</span>
          </label>
          <br />

          <Button isDisabled={isPending}>Add Question</Button>
        </form>
      </div>
    </>
  );
};

export default AddQuestionPage;
