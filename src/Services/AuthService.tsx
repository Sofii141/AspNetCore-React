import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";
import { toast } from "react-toastify";

const api = "http://localhost:5209/api/";

// Esta función toma un error de ASP.NET Identity y lo convierte en español.
const translateIdentityError = (error: any): string => {
  switch (error.code) {
    case "DuplicateUserName":
      const username = error.description.match(/'(.*?)'/)[1];
      return `El nombre de usuario '${username}' ya está en uso. Por favor, elige otro.`;
    case "DuplicateEmail":
      const email = error.description.match(/'(.*?)'/)[1];
      return `El correo electrónico '${email}' ya ha sido registrado.`;
    case "PasswordTooShort":
      return "La contraseña es demasiado corta. Debe tener al menos 6 caracteres.";
    default:
      return error.description || "Ocurrió un error desconocido.";
  }
};

export const getCurrentUserId = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid || payload.sub;
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
    if (data.data.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("username", username);
    }
    return data;
  } catch (error) {
    handleError(error);
  }
};

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
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      if (Array.isArray(errorData)) {
        
        const translatedMessages = errorData.map(translateIdentityError).join("\n");
        toast.error(translatedMessages);
      } else {
        toast.error("Error en el registro. Inténtalo de nuevo.");
      }
    } else {
      handleError(error);
    }
  }
};
