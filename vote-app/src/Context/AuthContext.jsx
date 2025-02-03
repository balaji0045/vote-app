// Change file name to AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { auth, checkAllowedUser } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const isAllowed = await checkAllowedUser(currentUser.email);
        setUser(isAllowed ? currentUser : null);
        setAllowed(isAllowed);
      } else {
        setUser(null);
        setAllowed(false);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, allowed, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
