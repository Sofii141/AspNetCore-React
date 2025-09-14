import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { stockCreateAPI, StockPost } from "../../Services/StockService";
import { toast } from "react-toastify";

// Define la estructura de los datos del formulario
type StockFormInputs = StockPost;

// Define las reglas de validación para todos los campos
const validationSchema = Yup.object().shape({
  symbol: Yup.string().required("El símbolo es requerido."),
  companyName: Yup.string().required("El nombre de la compañía es requerido."),
  purchase: Yup.number().typeError("Debe ser un número").positive("El precio debe ser positivo.").required("El precio es requerido."),
  lastDiv: Yup.number().typeError("Debe ser un número").min(0, "El dividendo no puede ser negativo.").required("El último dividendo es requerido."),
  industry: Yup.string().required("La industria es requerida."),
  marketCap: Yup.number().typeError("Debe ser un número").positive("La capitalización debe ser positiva.").required("La capitalización es requerida."),
  sector: Yup.string().required("El sector es requerido."),
  description: Yup.string().required("La descripción es requerida."),
  dcf: Yup.number().typeError("Debe ser un número").positive("El DCF debe ser positivo.").required("El DCF es requerido."),
});

const CreateStockPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StockFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<StockFormInputs> = async (data) => {
    setIsLoading(true);
    
    const payload: StockPost = {
      ...data,
      purchase: parseFloat(String(data.purchase)),
      lastDiv: parseFloat(String(data.lastDiv)),
      marketCap: parseInt(String(data.marketCap), 10),
      dcf: parseFloat(String(data.dcf)),
    };
    
    const result = await stockCreateAPI(payload);
    
    if (result) {
      toast.success("¡Acción creada exitosamente!");
      navigate("/admin/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999] py-12">
      <div className="w-full max-w-2xl">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Crear Nueva Acción</h1>
          <p className="text-[#B24069] font-medium">Administra tu portafolio de inversiones</p>
        </div>

        {/* Tarjeta del formulario */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#24114B]">Información de la Acción</h2>
              <p className="text-gray-600 mt-2">Completa todos los campos requeridos</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="symbol" className="block text-sm font-medium text-[#24114B] mb-2">Símbolo</label>
                  <input 
                    id="symbol" 
                    {...register("symbol")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: AAPL" 
                  />
                  {errors.symbol && <p className="mt-1 text-sm text-red-600">{errors.symbol.message}</p>}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-[#24114B] mb-2">Nombre de la Compañía</label>
                  <input 
                    id="companyName" 
                    {...register("companyName")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: Apple Inc." 
                  />
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label htmlFor="purchase" className="block text-sm font-medium text-[#24114B] mb-2">Precio</label>
                  <input 
                    id="purchase" 
                    type="number" 
                    step="0.01" 
                    {...register("purchase")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: 150.75" 
                  />
                  {errors.purchase && <p className="mt-1 text-sm text-red-600">{errors.purchase.message}</p>}
                </div>

                <div>
                  <label htmlFor="lastDiv" className="block text-sm font-medium text-[#24114B] mb-2">Último Dividendo</label>
                  <input 
                    id="lastDiv" 
                    type="number" 
                    step="0.01" 
                    {...register("lastDiv")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: 0.88" 
                  />
                  {errors.lastDiv && <p className="mt-1 text-sm text-red-600">{errors.lastDiv.message}</p>}
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-[#24114B] mb-2">Industria</label>
                  <input 
                    id="industry" 
                    {...register("industry")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: Tecnología" 
                  />
                  {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
                </div>

                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-[#24114B] mb-2">Sector</label>
                  <input 
                    id="sector" 
                    {...register("sector")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: Consumer Electronics" 
                  />
                  {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>}
                </div>

                <div>
                  <label htmlFor="marketCap" className="block text-sm font-medium text-[#24114B] mb-2">Capitalización de Mercado</label>
                  <input 
                    id="marketCap" 
                    type="number" 
                    {...register("marketCap")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: 2500000000000" 
                  />
                  {errors.marketCap && <p className="mt-1 text-sm text-red-600">{errors.marketCap.message}</p>}
                </div>

                <div>
                  <label htmlFor="dcf" className="block text-sm font-medium text-[#24114B] mb-2">DCF</label>
                  <input 
                    id="dcf" 
                    type="number" 
                    step="0.01" 
                    {...register("dcf")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                    placeholder="Ej: 175.50" 
                  />
                  {errors.dcf && <p className="mt-1 text-sm text-red-600">{errors.dcf.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#24114B] mb-2">Descripción</label>
                <textarea 
                  id="description" 
                  {...register("description")} 
                  rows={4} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                  placeholder="Describe la compañía y sus operaciones principales..." 
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
                  className="py-3 px-6 bg-gray-300 text-gray-700 font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-3 px-6 bg-gradient-to-r from-[#B24069] to-[#522999] text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B24069] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                    </span>
                  ) : (
                    "Crear Acción"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStockPage;