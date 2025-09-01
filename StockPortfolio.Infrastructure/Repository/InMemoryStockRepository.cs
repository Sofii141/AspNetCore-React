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
        private static readonly List<Stock> _stocks = new List<Stock>
        {
            new Stock { Id = 1, Symbol = "TSLA", CompanyName = "Tesla Inc.", Purchase = 180.00m, Industry = "Automotive", MarketCap = 580000000000 },
            new Stock { Id = 2, Symbol = "AAPL", CompanyName = "Apple Inc.", Purchase = 170.50m, Industry = "Technology", MarketCap = 2600000000000 },
            new Stock { Id = 3, Symbol = "GOOGL", CompanyName = "Alphabet Inc.", Purchase = 140.20m, Industry = "Technology", MarketCap = 1700000000000 }
        };

        public Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            return Task.FromResult(_stocks);
        }

        public Task<Stock?> GetByIdAsync(int id)
        {
            return Task.FromResult(_stocks.FirstOrDefault(s => s.Id == id));
        }

        // --- ¡LÓGICA IMPLEMENTADA! ---
        public Task<Stock> CreateAsync(Stock stockModel)
        {
            // Simulamos un ID autoincremental
            var maxId = _stocks.Max(s => s.Id);
            stockModel.Id = maxId + 1;
            _stocks.Add(stockModel);
            return Task.FromResult(stockModel);
        }

        // --- ¡LÓGICA IMPLEMENTADA! ---
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

            return Task.FromResult<Stock?>(existingStock);
        }

        // --- ¡LÓGICA IMPLEMENTADA! ---
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

        // Métodos de ayuda
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