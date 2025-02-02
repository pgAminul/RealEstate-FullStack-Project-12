import { useContext } from "react";
import { ContextProvider } from "./AuthProvider";

// Custom hook for accessing the auth context
const useAuth = () => {
  return useContext(ContextProvider);
};

export default useAuth;
