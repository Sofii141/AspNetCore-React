// Ruta del archivo: src/Context/useAuth.tsx (CORREGIDO)

import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type UserContextType = {
  user: UserProfile | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
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
        
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        
        toast.success("Registration Successful!");
        navigate("/search");
      }
    } catch (error) {
        // El servicio de API ya se encarga de mostrar el toast de error
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

        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        toast.success("Login Success!");

        // --- ¡AQUÍ ESTÁ LA NUEVA LÓGICA DE REDIRECCIÓN INTELIGENTE! ---

        // 1. Decodificamos el token INMEDIATAMENTE después de recibirlo.
        //    Esto nos da acceso a los roles sin tener que llamar a la función 'isAdmin'.
        type DecodedToken = {
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
            "role"?: string | string[];
        };
        const decodedToken: DecodedToken = jwtDecode(token);
        const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken["role"];
        
        // 2. Verificamos si el rol es 'Admin'.
        let isAdminUser = false;
        if (roles) {
            isAdminUser = Array.isArray(roles) ? roles.includes("Admin") : roles === "Admin";
        }
        
        // 3. Redirigimos basándonos en el resultado.
        if (isAdminUser) {
          console.log("Usuario es Admin, redirigiendo a /admin/dashboard");
          navigate("/admin/dashboard"); // <-- Redirección para Admins
        } else {
          console.log("Usuario es normal, redirigiendo a /search");
          navigate("/search"); // <-- Redirección para Usuarios Normales
        }
      }
    } catch (error) {
        // El servicio de API ya se encarga de mostrar el toast de error
    }
  };
  
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

// En src/Context/useAuth.tsx

const isAdmin = () => {
    const token = localStorage.getItem("token");
    console.log("1. ¿Existe un token?", !!token); // Log 1

    if (!token) return false;

    try {
      type DecodedToken = {
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
        "role"?: string | string[];
      };

      const decodedToken: DecodedToken = jwtDecode(token);
      console.log("2. Token decodificado:", decodedToken); // Log 2

      const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decodedToken["role"];
      console.log("3. Roles encontrados en el token:", roles); // Log 3
      
      if (!roles) {
        console.log("4. No se encontraron roles, devolviendo false."); // Log 4
        return false;
      }
      
      const result = Array.isArray(roles) ? roles.includes("Admin") : roles === "Admin";
      console.log("5. ¿Es el rol 'Admin'?", result); // Log 5

      return result;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, logout, isLoggedIn, registerUser, isAdmin }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);