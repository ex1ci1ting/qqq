import React, { Suspense } from "react";
import cls from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { ToastContainer } from "react-toastify";
import { Loader } from "../Loader/Loader";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className={cls.mainContainer}>
        <header className={cls.header}>{<Header />}</header>
        <div className={cls.mainWrapper}>
          <main className={cls.main}>
            <Suspense fallback={<Loader/>}>
              <Outlet />
            </Suspense>
          </main>
          <footer className={cls.footer}>
            Footer <br /> {currentYear}
          </footer>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
