import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Company } from "../../company";
import { searchCompaniesAPI, stockDeleteAPI } from "../../Services/StockService";
import { toast } from "react-toastify";

const AdminDashboardPage = () => {
  const [stocks, setStocks] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    setIsLoading(true);
    try {
      const result = await searchCompaniesAPI("");
      if (result && Array.isArray(result.data)) {
        setStocks(result.data);
      }
    } catch (error) {
      toast.error("Error al cargar las acciones");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStock = async (id: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta acción?")) {
      await stockDeleteAPI(id);
      toast.success("Acción eliminada exitosamente.");
      getStocks();
    }
  };

  const filteredStocks = useMemo(() => {
    if (!searchTerm) {
      return stocks;
    }
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stocks, searchTerm]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-[#B24069] font-medium">Gestiona tu portafolio de acciones</p>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#24114B] mb-4 md:mb-0">Lista de Acciones</h2>
            <Link
              to="/admin/stock/create"
              className="py-3 px-6 bg-gradient-to-r from-[#B24069] to-[#522999] text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              + Crear Nueva Acción
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por símbolo o nombre de compañía..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabla de acciones */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B24069]"></div>
            </div>
          ) : filteredStocks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchTerm ? "No se encontraron acciones que coincidan con la búsqueda" : "No hay acciones disponibles"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow-inner">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gradient-to-r from-[#B24069] to-[#522999] text-white">
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Símbolo</th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Nombre de la Compañía</th>
                    <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStocks.map((stock) => (
                    <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#24114B]">
                        {stock.symbol}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {stock.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                        <Link
                          to={`/admin/stock/edit/${stock.id}`}
                          className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDeleteStock(stock.id)}
                          className="inline-block py-1 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Información de resultados */}
          <div className="mt-6 text-sm text-gray-600">
            {filteredStocks.length > 0 && (
              <p>Mostrando {filteredStocks.length} de {stocks.length} acciones</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;