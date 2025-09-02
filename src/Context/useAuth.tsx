import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

// --- CAMBIO 1: El token es un detalle de implementación, no es necesario exponerlo en el contexto ---
type UserContextType = {
  user: UserProfile | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  // --- CAMBIO 2: No necesitamos un estado para el token, se gestiona en localStorage y en los headers de Axios ---
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      // Esto configura Axios correctamente al recargar la página si ya había una sesión
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res && res.data) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
        
        // --- CAMBIO 3 (CRÍTICO): Actualizamos los headers de Axios INMEDIATAMENTE después del registro ---
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        
        toast.success("Registration Successful!");
        navigate("/search");
      }
    } catch (error) {
        // El servicio de API ya se encarga de mostrar el toast de error con handleError
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res && res.data) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);

        // --- CAMBIO 4 (CRÍTICO): Actualizamos los headers de Axios INMEDIATAMENTE después del login ---
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        toast.success("Login Success!");
        navigate("/search");
      }
    } catch (error) {
        // El servicio de API ya se encarga de mostrar el toast de error con handleError
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    
    // --- CAMBIO 5 (CRÍTICO): Limpiamos los headers de Axios para que no envíe un token viejo ---
    delete axios.defaults.headers.common["Authorization"];

    navigate("/");
  };

  return (
    <UserContext.Provider
      // --- CAMBIO 6: Ya no pasamos el token en el 'value' ---
      value={{ loginUser, user, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);