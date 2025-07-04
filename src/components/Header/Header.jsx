import React, { useState } from "react";
import cls from "./Header.module.css";
import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <div className={cls.rightWrapper} onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="" />
        <span>React Cards</span>
      </div>

      <div className={cls.headerButtons}>
        <Button isActive={true} onClick={() => navigate("/addquestion")}>
          Add
        </Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </header>
  );
};
