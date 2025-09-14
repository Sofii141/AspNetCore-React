// Ruta: src/Pages/Admin/EditStockPage.tsx (CORREGIDO)

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getStockByIdAPI, stockUpdateAPI, StockPost } from "../../Services/StockService";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinners/Spinner";

type StockFormInputs = StockPost;

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

const EditStockPage = () => {
  const navigate = useNavigate();
  const { stockId } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchStock = async () => {
      const id = parseInt(stockId!);
      if (id) {
        const response = await getStockByIdAPI(id);
        if (response && response.data) {
          reset(response.data);
        }
        setIsLoading(false);
      }
    };
    fetchStock();
  }, [stockId, reset]);

  const onSubmit: SubmitHandler<StockFormInputs> = async (data) => {
    const id = parseInt(stockId!);
    if (id) {
      const payload: StockPost = {
        ...data,
        purchase: parseFloat(String(data.purchase)),
        lastDiv: parseFloat(String(data.lastDiv)),
        marketCap: parseInt(String(data.marketCap), 10),
        dcf: parseFloat(String(data.dcf)),
      };
      
      const result = await stockUpdateAPI(id, payload);
      
      if (result) {
        toast.success("¡Acción actualizada exitosamente!");
        navigate("/admin/dashboard");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Editar Acción</h1>
          <p className="text-[#B24069] font-medium">Actualiza la información de la acción</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="symbol" className="block text-sm font-medium text-[#24114B] mb-2">Símbolo</label>
                  <input 
                    id="symbol" 
                    {...register("symbol")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                  />
                  {errors.symbol && <p className="mt-1 text-sm text-red-600">{errors.symbol.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-[#24114B] mb-2">Nombre de la Compañía</label>
                  <input 
                    id="companyName" 
                    {...register("companyName")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
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
                  />
                  {errors.lastDiv && <p className="mt-1 text-sm text-red-600">{errors.lastDiv.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-[#24114B] mb-2">Industria</label>
                  <input 
                    id="industry" 
                    {...register("industry")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
                  />
                  {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-[#24114B] mb-2">Sector</label>
                  <input 
                    id="sector" 
                    {...register("sector")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
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
                  />
                  {errors.marketCap && <p className="mt-1 text-sm text-red-600">{errors.marketCap.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="dcf" className="block text-sm font-medium text-[#24114B] mb-2">DCF (Flujo de Caja Descontado)</label>
                  <input 
                    id="dcf" 
                    type="number" 
                    step="0.01" 
                    {...register("dcf")} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B24069] focus:border-transparent transition-all duration-200" 
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
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
              </div>

              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-gradient-to-r from-[#B24069] to-[#522999] text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B24069]"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStockPage;