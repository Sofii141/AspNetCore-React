import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
// CAMBIO 1: Importamos nuestra nueva interfaz 'Company'
import { Company } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";

interface Props {
  id: string;
  // CAMBIO 2: El tipo de 'searchResult' ahora es 'Company'
  searchResult: Company;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}/company-profile`}
        className="font-bold text-center text-veryDarkViolet md:text-left"
      >
        {/* CAMBIO 3: Usamos 'companyName' en lugar de 'name' */}
        {searchResult.companyName} ({searchResult.symbol})
      </Link>
      
      {/* CAMBIO 4: Mostramos currency y exchange si existen. */}
      <p className="text-veryDarkBlue">{searchResult.currency || "USD"}</p>
      <p className="font-bold text-veryDarkBlue">
        {/* El campo 'stockExchange' ya no existe, lo eliminamos. */}
        {searchResult.exchangeShortName || "NASDAQ"}
      </p>

      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;