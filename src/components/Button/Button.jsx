import React from "react";
import cls from "./Button.module.css";

export const Button = ({ onClick, children, isActive, isDisabled }) => {
  return (
      <button
        className={`${cls.btn} ${isActive ? cls.primary : ""}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
  );
};
