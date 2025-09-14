// Ruta: src/Services/StockService.ts (COMPLETO Y FINAL)

import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Company } from "../company"; 
import { toast } from "react-toastify";

// LA URL de tu backend
const api = "http://localhost:5209/api/stock/";

// Interfaz para los datos que se envían al crear o actualizar una acción
export interface StockPost {
    symbol: string;
    companyName: string;
    purchase: number;
    lastDiv: number;
    industry: string;
    marketCap: number;
    sector: string;
    description: string;
    dcf: number;
}

// --- FUNCIONES PARA USUARIOS NORMALES ---

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
    return { data: [] };
  }
};

export const getCompanyProfileAPI = async (ticker: string): Promise<{ data: Company[] }> => {
  try {
    // Esta lógica podría optimizarse llamando directamente a un endpoint de ID, pero funciona.
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

// Conseguir todo el stock
export const getAllStocksAPI = async (): Promise<Company[]> => {
  try {
    const response = await axios.get<Company[]>(api);
    return response.data;
  } catch (error) {
    handleError(error);
    return [];
  }
};


// --- FUNCIONES PARA EL PANEL DE ADMINISTRACIÓN ---

// --- ¡FUNCIÓN AÑADIDA! ---
// GET by ID: Obtiene los datos de una sola acción por su ID.
// Esencial para que el formulario de "Editar" se pueda poblar.
export const getStockByIdAPI = async (id: number) => {
    try {
        const data = await axios.get<Company>(api + id);
        return data;
    } catch (error) {
        handleError(error);
    }
}

// En src/Services/StockService.ts

export const stockCreateAPI = async (stock: StockPost) => {
    try {
        const data = await axios.post<Company>(api, stock);
        return data;
    } catch (error: any) { // Cambiamos 'error' a 'error: any' para poder inspeccionarlo
        // --- ¡AÑADE ESTA LÍNEA DE DEPURACIÓN! ---
        if (error.response) {
            console.error("Error de la API:", error.response.data);
            // Aquí puedes ver los errores específicos, ej: { CompanyName: ["Company Name cannot be over 10..."] }
            toast.warning(JSON.stringify(error.response.data.errors));
        }
        handleError(error);
    }
}

// PUT: Actualiza una acción existente.
// Esencial para que el formulario de "Editar" pueda guardar los cambios.
export const stockUpdateAPI = async (id: number, stock: StockPost) => {
    try {
        const data = await axios.put<Company>(api + id, stock);
        return data;
    } catch (error) {
        handleError(error);
    }
}

// DELETE: Elimina una acción.
export const stockDeleteAPI = async (id: number) => {
    try {
        const data = await axios.delete<Company>(api + id);
        return data;
    } catch (error) {
        handleError(error);
    }
}