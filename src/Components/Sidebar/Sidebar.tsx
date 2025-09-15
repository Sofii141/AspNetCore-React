import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <nav className="block py-6 px-5 top-0 bottom-0 w-64 bg-gradient-to-b from-purple-50 to-purple-100 backdrop-blur-sm bg-opacity-90 shadow-2xl left-0 absolute flex-row flex-nowrap md:z-10 z-9999 transition-all duration-300 ease-in-out transform md:translate-x-0 -translate-x-full border-r border-purple-200">
      <div className="flex-col min-h-full px-0 flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col items-stretch opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden h-auto z-40 items-center flex-1 rounded w-full">
          <div className="md:flex-col md:min-w-full flex flex-col list-none space-y-2">
            <Link
              to="company-profile"
              className="flex items-center md:min-w-full text-purple-800 hover:text-purple-600 text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-60 backdrop-blur-sm group"
            >
              <FaHome className="text-lg group-hover:scale-110 transition-transform duration-200" />
              <span className="ml-3 tracking-wide">Company Profile</span>
            </Link>
            {/* Puedes agregar más enlaces aquí en el futuro */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;