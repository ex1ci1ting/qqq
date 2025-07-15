import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";

export const UseAuth = () => {
  return useContext(AuthContext);
};
