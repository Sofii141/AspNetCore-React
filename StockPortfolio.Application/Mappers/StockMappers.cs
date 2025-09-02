// Ruta: StockPortfolio.Application/Mappers/StockMappers.cs (CORREGIDO)

using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Domain.Entities;
using System.Linq;

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
                Sector = stockModel.Sector,
                Description = stockModel.Description,
                Dcf = stockModel.Dcf,
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
                MarketCap = stockDto.MarketCap,

                // --- ¡CORRECCIÓN CLAVE! ---
                // Añadimos los campos que faltaban.
                Sector = stockDto.Sector,
                Description = stockDto.Description,
                Dcf = stockDto.Dcf
            };
        }

        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            return new Stock
            {
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