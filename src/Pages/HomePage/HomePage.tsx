import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#B24069]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#522999]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#FAEDEB]/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="text-white font-bold text-2xl">Karo juan sofi isa</div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-white hover:text-[#B24069] transition-colors">Características</a>
          <a href="#services" className="text-white hover:text-[#B24069] transition-colors">Servicios</a>
          <a href="#about" className="text-white hover:text-[#B24069] transition-colors">Nosotros</a>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4 md:px-8 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Transformamos tu <span className="text-[#B24069]">presencia</span> digital
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          Potenciamos tus acciones en el mundo digital con estrategias innovadoras y resultados medibles.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-[#B24069] to-[#522999] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Comienza Ahora
          </Link>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
            Conoce Más
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestras Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Estrategias Personalizadas",
              description: "Desarrollamos planes a medida para tus objetivos específicos.",
              icon: "📊"
            },
            {
              title: "Resultados Medibles",
              description: "Seguimiento constante y reportes detallados de tu progreso.",
              icon: "📈"
            },
            {
              title: "Innovación Constante",
              description: "Implementamos las últimas tendencias en marketing digital.",
              icon: "💡"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-16 px-4 md:px-8 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Gestión de Redes Sociales",
                description: "Creamos y gestionamos contenido atractivo para tus redes sociales."
              },
              {
                title: "Publicidad Digital",
                description: "Campañas efectivas en Google Ads, Facebook Ads y más."
              },
              {
                title: "SEO y Posicionamiento",
                description: "Mejoramos tu visibilidad en los motores de búsqueda."
              },
              {
                title: "Diseño Web",
                description: "Creamos sitios web modernos y responsive para tu negocio."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Listo para transformar tu presencia digital?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Únete a nosotros y descubre cómo podemos potenciar tus acciones en el mundo digital.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#B24069] to-[#522999] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Crear Cuenta Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-white font-bold text-2xl mb-4 md:mb-0">Kaisoju</div>
          <div className="text-gray-400">
            &copy; {new Date().getFullYear()} Kaisoju. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;