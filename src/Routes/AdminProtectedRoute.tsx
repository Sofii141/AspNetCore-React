// Ruta del archivo: src/Routes/AdminProtectedRoute.tsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };

const AdminProtectedRoute = ({ children }: Props) => {
  // 'useLocation' nos ayuda a saber a qué página intentaba ir el usuario.
  const location = useLocation();
  // Usamos nuestro hook 'useAuth' para verificar el estado de login y si es admin.
  const { isLoggedIn, isAdmin } = useAuth();

  // 1. Primera Verificación: ¿El usuario ha iniciado sesión?
  if (!isLoggedIn()) {
    // Si NO ha iniciado sesión, lo redirigimos a la página de login.
    // 'state={{ from: location }}' es un truco para que, después del login,
    // podamos redirigirlo de vuelta a la página admin que intentaba visitar.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Segunda Verificación: Si ya inició sesión, ¿es un administrador?
  if (!isAdmin()) {
      // Si NO es un admin, lo enviamos a una página segura, como la de búsqueda.
      // No debería estar aquí.
      return <Navigate to="/search" replace />;
  }

  // Si pasa ambas verificaciones (está logueado Y es admin),
  // entonces le mostramos el contenido de la ruta protegida.
  return <>{children}</>;
};

export default AdminProtectedRoute;