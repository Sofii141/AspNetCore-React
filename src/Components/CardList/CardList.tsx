import React, { SyntheticEvent } from "react";
import Card from "../Card/Card";
// CAMBIO 1: Importamos nuestra interfaz unificada 'Company'
import { Company } from "../../company"; 
import { v4 as uuidv4 } from "uuid";

interface Props {
  // CAMBIO 2: La lista de resultados ahora es un array de 'Company'
  searchResults: Company[]; 
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div>
      {searchResults.length > 0 ? (
        // No hay cambios aquí. El método .map() funciona perfectamente.
        // TypeScript ahora sabe que 'result' es de tipo 'Company'.
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuidv4()}
              searchResult={result} // Pasamos el objeto 'Company' al componente Card
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default CardList;