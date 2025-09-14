import React, { SyntheticEvent } from "react";

interface Props {
  onPortfolioDelete: (e: SyntheticEvent) => void;
  portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <form onSubmit={onPortfolioDelete} className="w-full">
      <input hidden={true} value={portfolioValue} readOnly />
      <button className="w-full p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
        Remove from Portfolio
      </button>
    </form>
  );
};

export default DeletePortfolio;