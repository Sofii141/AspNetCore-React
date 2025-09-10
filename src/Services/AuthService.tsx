import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5209/api/";

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
