import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5209/api/comment/";

// Función para obtener el token del localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Configurar axios para incluir el token por defecto
axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const commentUpdateAPI = async (
    id: number,
    title: string,
    content: string
) => {
    try {
        const data = await axios.put<CommentGet>(api + id, {
            title: title,
            content: content,
        });
        return data;
    } catch (error) {
        handleError(error);
        throw error; // Importante: relanzar el error para manejarlo en el componente
    }
};

export const commentDeleteAPI = async (id: number) => {
    try {
        const data = await axios.delete<CommentGet>(api + id);
        return data;
    } catch (error) {
        handleError(error);
        throw error; // Importante: relanzar el error para manejarlo en el componente
    }
};
