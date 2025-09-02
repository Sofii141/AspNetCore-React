import React, { useEffect, useState } from "react";
// CAMBIO 1: Importamos nuestra nueva y única interfaz 'Company'
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
  // CAMBIO 2: El estado ahora es de tipo 'Company' o 'undefined'
  const [company, setCompany] = useState<Company | undefined>();

  useEffect(() => {
    const getProfileInit = async () => {
      // ticker puede ser undefined, así que lo verificamos
      if (!ticker) return; 
      
      const result = await getCompanyProfileAPI(ticker);
      if (result && result.data && result.data.length > 0) {
        // TypeScript ahora sabe que result.data[0] es de tipo 'Company'
        setCompany(result.data[0]);
      }
    };
    getProfileInit();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            {/* Usamos 'purchase' que es la propiedad correcta de nuestra interfaz */}
            <Tile title="Price" subTitle={"$" + company.purchase.toString()} />
            <Tile title="DCF" subTitle={"$" + company.dcf.toString()} />
            <Tile title="Sector" subTitle={company.sector} />
            
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;