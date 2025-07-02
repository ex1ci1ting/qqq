import React from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={cls.mainContainer}>
      <header className={cls.header}>Header</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          Footer <br /> {currentYear}
        </footer>
      </div>
    </div>
  );
};
