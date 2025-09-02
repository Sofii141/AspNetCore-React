import React from "react";
import { useOutletContext } from "react-router-dom";
import Spinner from "../Spinners/Spinner";
import StockComment from "../StockComment/StockComment";

type Props = {};

const CompanyProfile = (props: Props) => {
  // Obtenemos el 'ticker' del contexto de la ruta padre (CompanyPage)
  const ticker = useOutletContext<string>();

  // La lógica para obtener los datos de la compañía ya no vive aquí,
  // vive en el componente padre 'CompanyPage'. Este componente hijo
  // solo se encarga de una parte de la UI.

  return (
    <>
      {/* 
        El componente ahora solo renderiza el sistema de comentarios.
        Le pasamos el 'ticker' para que sepa de qué compañía obtener los comentarios.
      */}
      {ticker ? (
        <StockComment stockSymbol={ticker} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;