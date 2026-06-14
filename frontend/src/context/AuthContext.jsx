import { createContext, useState,useEffect } from "react";

const AuthContext = createContext();
import { getProfile } from "../api/authApi";

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  loadUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;