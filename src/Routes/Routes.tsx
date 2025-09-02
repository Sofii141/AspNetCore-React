// Ruta del archivo: src/Routes/Routes.tsx (VERSIÓN FINAL Y FUNCIONAL)

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

// --- ¡CAMBIO 1: Descomentamos las importaciones de las páginas de admin! ---
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboardPage from "../Pages/Admin/AdminDashboardPage";
import CreateStockPage from "../Pages/Admin/CreateStockPage";
import EditStockPage from "../Pages/Admin/EditStockPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // --- Rutas existentes (sin cambios) ---
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: "design-guide", element: <DesignGuide /> },
      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
        ],
      },
      
      // --- ¡CAMBIO 2: Descomentamos y activamos las rutas de administración! ---
      // Ahora React Router sabrá qué componente mostrar para cada una de estas URLs.
      {
        path: "admin/dashboard",
        element: (
          <AdminProtectedRoute>
            <AdminDashboardPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin/stock/create", // <-- ESTA ES LA RUTA QUE FALTABA
        element: (
          <AdminProtectedRoute>
            <CreateStockPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "admin/stock/edit/:stockId", // <-- TAMBIÉN ACTIVAMOS ESTA PARA EL FUTURO
        element: (
          <AdminProtectedRoute>
            <EditStockPage />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
]);