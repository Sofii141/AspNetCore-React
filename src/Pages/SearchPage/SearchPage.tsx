import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { Company } from "../../company"; 
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { PortfolioGet } from "../../Models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "../../Services/PortfolioService";
import { toast } from "react-toastify";
import { searchCompaniesAPI } from "../../Services/StockService";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<Company[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    getPortfolio();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        setPortfolioValues(null);
      });
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res?.status === 201 || res?.status === 204) {
          toast.success("Stock added to portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not add stock to portfolio!");
      });
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status === 200) {
        toast.success("Stock deleted from portfolio!");
        getPortfolio();
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompaniesAPI(search);
    
    if (result && Array.isArray(result.data)) {
        setSearchResult(result.data);
    } else if (typeof result === "string") {
      setServerError(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999] relative overflow-hidden p-4">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#B24069]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#522999]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#FAEDEB]/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Buscar Empresas</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
          <Search
            onSearchSubmit={onSearchSubmit}
            search={search}
            handleSearchChange={handleSearchChange}
          />
        </div>

        {portfolioValues && portfolioValues.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Tu Portfolio</h2>
            <ListPortfolio
              portfolioValues={portfolioValues}
              onPortfolioDelete={onPortfolioDelete}
            />
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Resultados de Búsqueda</h2>
          <CardList
            searchResults={searchResult}
            onPortfolioCreate={onPortfolioCreate}
          />
        </div>

        {serverError && (
          <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-md rounded-xl border border-red-500/30">
            <p className="text-red-200">{serverError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;