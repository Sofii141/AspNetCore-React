import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5209/api/";

export const getCurrentUserId = (): string | null => {
  // Opción 1: Si guardas el user ID en localStorage
  const userId = localStorage.getItem("userId");
  if (userId) return userId;
  
  // Opción 2: Si decodificas del token JWT
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid || payload.sub; // Depende de tu token
  } catch (error) {
    return null;
  }
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });

     // Guardar token y username
    if (data.data.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("username", username); 
    }

    return data;
  } catch (error) {
    handleError(error);
  }
};

// O si guardas el username directamente:
export const getCurrentUsername = (): string | null => {
  return localStorage.getItem("username");
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
