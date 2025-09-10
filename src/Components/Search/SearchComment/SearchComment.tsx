//Barra de busqueda para comentarios
import React from "react";

type Props = {
placeholder?: string;
searchTerm: string;
onSearchChange: (value: string) => void;
};

const SearchBar = ({ 
placeholder = "Search comments...", 
searchTerm, 
onSearchChange 
}: Props) => {
    return (
        <div className="relative mb-4 ml-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </div>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
        />
        </div>
    );
};

export default SearchBar;