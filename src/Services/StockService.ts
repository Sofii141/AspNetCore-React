import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Company } from "../company"; 

// LA URL de tu backend
const api = "http://localhost:5209/api/stock/";

// CAMBIO 1: Eliminamos el 'type ApiResponse<T>' de aquí.

// Función para buscar/obtener todas las acciones
// CAMBIO 2: Escribimos el tipo de retorno completo directamente aquí.
export const searchCompaniesAPI = async (query: string): Promise<{ data: Company[] }> => {
  try {
    const response = await axios.get<Company[]>(api);
    let allStocks = response.data;

    if (query) {
      allStocks = allStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.companyName.toLowerCase().includes(query.toLowerCase())
      );
    }
    return { data: allStocks };
  } catch (error) {
    handleError(error);
    return { data: [] }; // Devuelve un array vacío en caso de error
  }
};

// Función para obtener el perfil de una sola compañía por su ticker
// CAMBIO 3: Escribimos el tipo de retorno completo también aquí.
export const getCompanyProfileAPI = async (ticker: string): Promise<{ data: Company[] }> => {
  try {
    const response = await axios.get<Company[]>(api);
    const company = response.data.find(
      (c) => c.symbol.toLowerCase() === ticker.toLowerCase()
    );
    
    return { data: company ? [company] : [] };
  } catch (error) {
    handleError(error);
    return { data: [] };
  }
};