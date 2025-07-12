import React, { useId } from "react";
import cls from "./Input.module.css";
import {SearchIcon } from "../icons";

export const Input = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon} />
      </label>
      <input
        placeholder="search..."
        id={inputId}
        className={cls.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
