import React, { useState } from "react";
import cls from "./Header.module.css";
import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../../helpers/hooks/UseAuth";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = UseAuth();

  const loginHandler = () => {
    localStorage.setItem("reactCardLogin", !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <div className={cls.rightWrapper} onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="" />
        <span>React Cards</span>
      </div>

      <div className={cls.headerButtons}>
        {isAuth && (
          <Button isActive={true} onClick={() => navigate("/addquestion")}>
            Add
          </Button> 
        )}

        <Button onClick={loginHandler} isActive={!isAuth}>{isAuth ? "Logout" : "Login"}</Button>
      </div>
    </header>
  ); 
};
