// Ruta: src/Components/Hero/Hero.tsx (CORREGIDO Y MEJORADO)

import React from "react";
import { Link } from "react-router-dom";
import hero from "./hero.png";
import "./Hero.css";
// --- ¡CAMBIO 1: Importamos useAuth para saber quién es el usuario! ---
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Hero = (props: Props) => {
  // --- ¡CAMBIO 2: Obtenemos las funciones que necesitamos del contexto! ---
  const { isLoggedIn, isAdmin } = useAuth();

  // --- ¡CAMBIO 3: Lógica de redirección inteligente para el botón! ---
  // Decidimos a dónde debe ir el enlace basándonos en el estado y rol del usuario.
  const getStartedPath = isLoggedIn() && isAdmin() ? "/admin/dashboard" : "/search";
  // Lógica:
  // - Si el usuario está logueado Y es admin -> llévalo al dashboard de admin.
  // - En cualquier otro caso (no logueado, o es usuario normal) -> llévalo al search.
  //   (El ProtectedRoute se encargará de redirigir a /login si no está logueado).

  return (
    <section id="hero">
      <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
        <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
          <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
            Financial data with no news.
          </h1>
          <p className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left">
            Search relevant financial documents without fear mongering and fake
            news.
          </p>
          <div className="mx-auto lg:mx-0">
            {/* --- ¡CAMBIO 4: Usamos la ruta dinámica que calculamos antes! --- */}
            <Link
              to={getStartedPath} 
              className="py-5 px-10 text-2xl font-bold text-white bg-lightGreen rounded lg:py-4 hover:opacity-70"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
          <img src={hero} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;