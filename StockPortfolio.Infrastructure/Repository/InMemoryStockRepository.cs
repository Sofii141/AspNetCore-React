// Ruta: StockPortfolio.Infrastructure/Repositories/InMemoryStockRepository.cs (CORREGIDO)

using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Application.Helpers;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class InMemoryStockRepository : IStockRepository
    {
        public static readonly List<Stock> _stocks = new List<Stock>
        {
            new Stock
            {
                Id = 1, Symbol = "TSLA", CompanyName = "Tesla Inc.",
                Purchase = 180.00m, Industry = "Automotive", MarketCap = 580000000000,
                Sector = "Automotive", Dcf = 175.50m,
                Description = "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally."
            },
            new Stock
            {
                Id = 2, Symbol = "AAPL", CompanyName = "Apple Inc.",
                Purchase = 170.50m, Industry = "Technology", MarketCap = 2600000000000,
                Sector = "Technology", Dcf = 165.00m,
                Description = "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
            },
            new Stock
            {
                Id = 3, Symbol = "GOOGL", CompanyName = "Alphabet Inc.",
                Purchase = 140.20m, Industry = "Technology", MarketCap = 1700000000000,
                Sector = "Technology", Dcf = 150.00m,
                Description = "Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America."
            }
        };

        public Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            // Devuelve una copia para evitar modificaciones accidentales de la lista original.
            return Task.FromResult(_stocks.ToList());
        }

        public Task<Stock?> GetByIdAsync(int id)
        {
            return Task.FromResult(_stocks.FirstOrDefault(s => s.Id == id));
        }

        public Task<Stock> CreateAsync(Stock stockModel)
        {
            // Lógica mejorada para evitar error si la lista está vacía.
            var maxId = _stocks.Any() ? _stocks.Max(s => s.Id) : 0;
            stockModel.Id = maxId + 1;
            _stocks.Add(stockModel);
            return Task.FromResult(stockModel);
        }

        public Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var existingStock = _stocks.FirstOrDefault(s => s.Id == id);
            if (existingStock == null)
            {
                return Task.FromResult<Stock?>(null);
            }

            existingStock.Symbol = stockDto.Symbol;
            existingStock.CompanyName = stockDto.CompanyName;
            existingStock.Purchase = stockDto.Purchase;
            existingStock.LastDiv = stockDto.LastDiv;
            existingStock.Industry = stockDto.Industry;
            existingStock.MarketCap = stockDto.MarketCap;

            // --- ¡CORRECCIÓN CLAVE! ---
            // Le decimos que también actualice los nuevos campos en la lista en memoria.
            existingStock.Sector = stockDto.Sector;
            existingStock.Description = stockDto.Description;
            existingStock.Dcf = stockDto.Dcf;

            return Task.FromResult<Stock?>(existingStock);
        }

        public Task<Stock?> DeleteAsync(int id)
        {
            var stockToDelete = _stocks.FirstOrDefault(s => s.Id == id);
            if (stockToDelete == null)
            {
                return Task.FromResult<Stock?>(null);
            }
            _stocks.Remove(stockToDelete);
            return Task.FromResult<Stock?>(stockToDelete);
        }

        public Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return Task.FromResult(_stocks.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower()));
        }

        public Task<bool> StockExists(int id)
        {
            return Task.FromResult(_stocks.Any(s => s.Id == id));
        }
    }
}