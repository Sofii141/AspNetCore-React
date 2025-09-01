using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Domain.Entities;
using System;
using System.Linq;

// El namespace debe coincidir con la estructura de carpetas
namespace StockPortfolio.Application.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDiv = stockDto.LastDiv,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        // --- ESTA ES LA PARTE CORREGIDA ---
        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            return new Stock
            {
                // Usamos las propiedades en PascalCase
                Symbol = fmpStock.Symbol,
                CompanyName = fmpStock.CompanyName,
                Purchase = (decimal)fmpStock.Price,
                LastDiv = (decimal)fmpStock.LastDiv,
                Industry = fmpStock.Industry,
                MarketCap = fmpStock.MktCap
            };
        }
    }
}