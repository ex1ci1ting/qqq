import React, { useEffect } from "react";
import cls from "./ForbiddenPage.module.css";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { UseAuth } from "../../../helpers/hooks/UseAuth";

export const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = UseAuth();
  const fromPage = location.state?.from || "/";
  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true });
  }, [isAuth]);
  return <h2 className={cls.title}>Page is forbidden</h2>;
};
