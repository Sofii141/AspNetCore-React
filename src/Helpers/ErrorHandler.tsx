import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    // Esta parte es genérica y funcionará con tu API de ASP.NET Core
    if (err?.data) {
      // Tu backend puede devolver errores como texto plano
      toast.warning(err.data);
    } else if (err?.status === 401) {
      // Si el token JWT expira o no es válido
      toast.warning("Please login");
      // Opcional: Redirigir al login
      // window.location.href = "/login";
    } else if (err) {
      // Otro tipo de error de red
      toast.warning(err.statusText);
    }
  } else {
    // Error inesperado que no es de axios
    toast.error("An unexpected error occurred.");
    console.error(error);
  }
};