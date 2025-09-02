// Ruta: src/Pages/Admin/AdminDashboardPage.tsx (MEJORADO CON BÚSQUEDA)

import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Company } from "../../company";
import { searchCompaniesAPI, stockDeleteAPI } from "../../Services/StockService";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  // --- ¡CAMBIO 1: Añadimos estado para la búsqueda y la lista completa! ---
  const [stocks, setStocks] = useState<Company[]>([]); // Almacena la lista completa sin filtrar
  const [searchTerm, setSearchTerm] = useState(""); // Almacena el texto de búsqueda

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    const result = await searchCompaniesAPI(""); // Llama a la API para obtener TODAS las acciones
    if (result && Array.isArray(result.data)) {
      setStocks(result.data);
    }
  };

  const handleDeleteStock = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta acción?")) {
      await stockDeleteAPI(id);
      toast.success("Acción eliminada exitosamente.");
      getStocks(); // Recarga la lista de acciones
    }
  };

  // --- ¡CAMBIO 2: Lógica de filtrado! ---
  // Esta variable se recalculará solo cuando 'stocks' o 'searchTerm' cambien.
  const filteredStocks = useMemo(() => {
    if (!searchTerm) {
      return stocks; // Si no hay búsqueda, devuelve todas las acciones
    }
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stocks, searchTerm]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Link
          to="/admin/stock/create"
          className="inline-block py-2 px-4 text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Crear Nueva Acción
        </Link>
      </div>

      {/* --- ¡CAMBIO 3: Añadimos el campo de búsqueda! --- */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por símbolo o nombre..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Símbolo
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre de la Compañía
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {/* --- ¡CAMBIO 4: Mapeamos la lista FILTRADA! --- */}
            {filteredStocks.map((stock) => (
              <tr key={stock.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {stock.symbol}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {stock.companyName}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-4">
                  <Link
                    to={`/admin/stock/edit/${stock.id}`}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteStock(stock.id)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;