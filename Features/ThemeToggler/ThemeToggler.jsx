import React from "react";
import cls from "./ThemeToggler.module.css";
import { UseTheme } from "../../helpers/hooks/UseTheme";

export const ThemeToggler = () => {
  const { theme, setTheme } = UseTheme();

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked === true;
    const updatedTheme = isChecked ? "dark" : "light";

    setTheme(updatedTheme);
    // isChecked ? document.body.classList.add("darkLayout") : document.body.classList.remove("darkLayout");
    localStorage.setItem("reactCardTheme", updatedTheme);
  };

  return (
    <label className={cls.switch}>
      <input
        onChange={onChangeHandler}
        checked={theme === "dark"}
        type="checkbox"
      />
      <span className={cls.slider}></span>
      <span className={cls.clouds_stars}></span>
    </label>
  );
};
