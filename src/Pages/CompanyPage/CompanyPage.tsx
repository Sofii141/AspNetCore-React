import React, { useEffect, useState } from "react";
import { Company } from "../../company"; 
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinners/Spinner";
import { getCompanyProfileAPI } from "../../Services/StockService";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<Company | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileInit = async () => {
      if (!ticker) return; 
      
      try {
        const result = await getCompanyProfileAPI(ticker);
        if (result && result.data && result.data.length > 0) {
          setCompany(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getProfileInit();
  }, [ticker]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden min-h-screen bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <div className="p-6">
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">{company.companyName}</h1>
                <p className="text-[#B24069] font-medium text-lg">{ticker}</p>
              </div>
              
              {/* Tiles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <h3 className="text-sm font-medium text-[#24114B] mb-2">Company Name</h3>
                  <p className="text-2xl font-bold text-[#522999]">{company.companyName}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <h3 className="text-sm font-medium text-[#24114B] mb-2">Price</h3>
                  <p className="text-2xl font-bold text-[#522999]">${company.purchase.toString()}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <h3 className="text-sm font-medium text-[#24114B] mb-2">DCF</h3>
                  <p className="text-2xl font-bold text-[#522999]">${company.dcf.toString()}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                  <h3 className="text-sm font-medium text-[#24114B] mb-2">Sector</h3>
                  <p className="text-2xl font-bold text-[#522999]">{company.sector}</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-[#24114B] mb-4 text-center">Company Description</h2>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {company.description}
                </p>
              </div>
            </div>
          </CompanyDashboard>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#180018] via-[#24114B] to-[#522999]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-[#24114B] mb-4">Company Not Found</h2>
            <p className="text-gray-600">We couldn't find data for the company with ticker: {ticker}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyPage;