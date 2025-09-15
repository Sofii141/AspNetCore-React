// Ruta: src/Components/Navbar/Navbar.tsx (VERSIÓN FINAL CON ROLES)

import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout, isAdmin } = useAuth();

  return (
    <nav className="relative container mx-auto p-2">
      <div className="flex items-center justify-between">
        {/* --- Logo y enlaces principales --- */}
        <div className="flex items-center space-x20">
          <Link to="/">
            <img src={logo} alt="" className="h-20" />
          </Link>
          <div className="hidden font-bold lg:flex space-x-6">
            
            {/* 
              --- ¡AQUÍ ESTÁ LA LÓGICA CLAVE! ---
              Usamos la función isAdmin() para decidir qué enlace mostrar.
              Esto crea una experiencia de usuario diferente para cada rol.
            */}
            {isLoggedIn() && ( // Primero, nos aseguramos de que el usuario haya iniciado sesión
              isAdmin() ? (
                // Si es ADMIN, mostramos solo el enlace al Panel de Admin
                <Link to="/admin/dashboard" className="text-red-600 hover:text-darkBlue">
                  Panel de administración
                </Link>
              ) : (
                // Si es un USUARIO NORMAL, mostramos solo el enlace de Búsqueda
                <Link to="/search" className="text-black hover:text-darkBlue">
                  Buscar
                </Link>
              )
            )}

          </div>
        </div>

        {/* --- Botones de Login/Logout y Bienvenida --- */}
        <div className="hidden lg:flex items-center space-x-6 text-back">
          {isLoggedIn() ? (
            // Si el usuario ha iniciado sesión (sea admin o no)
            <>
              <div className="hover:text-darkBlue">Bienvenido, {user?.userName}</div>
              <a
                onClick={logout}
                href="#"
                className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Cerrar sesión
              </a>
            </>
          ) : (
            // Si el usuario NO ha iniciado sesión
            <>
              <Link to="/login" className="hover:text-darkBlue">
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;