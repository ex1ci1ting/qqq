import React from "react";
import cls from "./QuestionForm.module.css";
import { Button } from "../Button";

export const QuestionForm = ({formAction, state, isPending, submitBtnText,}) => {
  // console.log(state.question);

  console.log(state);

  return (
    <form action={formAction} className={cls.form}>
      <input type="text" name="questionId" defaultValue={state.id} hidden />
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question :</label>
        <textarea
          name="question"
          id="questionField"
          cols="30"
          rows="2"
          required
          placeholder="please enter question"
          defaultValue={state.question}
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
          defaultValue={state.answer}
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
          defaultValue={state.description}
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
          defaultValue={state.resources}
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
          defaultChecked={state.clearForm}
        />
        <span>clear form after submitting ?</span>
      </label>
      <br />

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
