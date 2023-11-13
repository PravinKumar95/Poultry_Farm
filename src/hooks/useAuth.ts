import { useEffect, useState } from "react";
import { userPool } from "../cognito";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginChange = () => {
    setIsLoggedIn(sessionStorage.isAuthenticated === "true" ? true : false);
  };
  useEffect(() => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((_error: any, session: any) => {
        if (session) {
          setIsLoggedIn(session.isValid());
        }
      });
    }
    window.addEventListener("storage", handleLoginChange);
    return () => removeEventListener("storage", handleLoginChange);
  }, []);

  return { isLoggedIn };
};

export default useAuth;
