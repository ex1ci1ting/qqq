import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";

export const UseTheme = () => {
  return useContext(ThemeContext);
};