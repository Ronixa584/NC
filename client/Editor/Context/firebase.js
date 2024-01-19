import { useEffect, createContext, useState } from "react";
import { auth1 } from "../../Config/firebase";
import { onAuthStateChanged } from "@firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth1, (res) => {
      setUser(res);
    });
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
