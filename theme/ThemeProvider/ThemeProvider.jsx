import React, { createContext, useState,useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("reactCardTheme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
