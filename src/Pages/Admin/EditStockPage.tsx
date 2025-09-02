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

// Usamos el mismo schema de validación que en la página de creación
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

  // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
  const onSubmit: SubmitHandler<StockFormInputs> = async (data) => {
    const id = parseInt(stockId!);
    if (id) {
      // 1. Creamos un 'payload' para asegurar que los tipos de datos son correctos.
      const payload: StockPost = {
        ...data, // Copiamos los campos que ya son string
        // 2. Convertimos explícitamente los campos que deben ser numéricos.
        purchase: parseFloat(String(data.purchase)),
        lastDiv: parseFloat(String(data.lastDiv)),
        marketCap: parseInt(String(data.marketCap), 10),
        dcf: parseFloat(String(data.dcf)),
      };
      
      // 3. Enviamos el 'payload' corregido a la API de actualización.
      const result = await stockUpdateAPI(id, payload);
      
      if (result) {
        toast.success("¡Acción actualizada exitosamente!");
        navigate("/admin/dashboard");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Editar Acción</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* El HTML del formulario no cambia */}
          <div>
            <label htmlFor="symbol" className="block mb-2 text-sm font-medium text-gray-700">Símbolo</label>
            <input id="symbol" {...register("symbol")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.symbol && <p className="mt-1 text-sm text-red-600">{errors.symbol.message}</p>}
          </div>
          <div>
            <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-700">Nombre de la Compañía</label>
            <input id="companyName" {...register("companyName")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
          </div>
          <div>
            <label htmlFor="purchase" className="block mb-2 text-sm font-medium text-gray-700">Precio</label>
            <input id="purchase" type="number" step="0.01" {...register("purchase")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.purchase && <p className="mt-1 text-sm text-red-600">{errors.purchase.message}</p>}
          </div>
          <div>
            <label htmlFor="lastDiv" className="block mb-2 text-sm font-medium text-gray-700">Último Dividendo</label>
            <input id="lastDiv" type="number" step="0.01" {...register("lastDiv")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.lastDiv && <p className="mt-1 text-sm text-red-600">{errors.lastDiv.message}</p>}
          </div>
          <div>
            <label htmlFor="industry" className="block mb-2 text-sm font-medium text-gray-700">Industria</label>
            <input id="industry" {...register("industry")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
          </div>
           <div>
            <label htmlFor="sector" className="block mb-2 text-sm font-medium text-gray-700">Sector</label>
            <input id="sector" {...register("sector")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector.message}</p>}
          </div>
          <div>
            <label htmlFor="marketCap" className="block mb-2 text-sm font-medium text-gray-700">Capitalización de Mercado</label>
            <input id="marketCap" type="number" {...register("marketCap")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.marketCap && <p className="mt-1 text-sm text-red-600">{errors.marketCap.message}</p>}
          </div>
          <div>
            <label htmlFor="dcf" className="block mb-2 text-sm font-medium text-gray-700">DCF (Flujo de Caja Descontado)</label>
            <input id="dcf" type="number" step="0.01" {...register("dcf")} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.dcf && <p className="mt-1 text-sm text-red-600">{errors.dcf.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" {...register("description")} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStockPage;