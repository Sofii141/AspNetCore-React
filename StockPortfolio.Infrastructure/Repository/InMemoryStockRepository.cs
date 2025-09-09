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
              // VALIDACIÓN: Verificar si ya existe un stock con el mismo symbol
            if (_stocks.Any(s => s.Symbol.ToLower() == stockModel.Symbol.ToLower()))
            {
                throw new System.Exception($"Ya existe un stock con el symbol '{stockModel.Symbol}'");
            }           
            // VALIDACIÓN: Verificar si ya existe un stock con el mismo nombre de compañía
            if (_stocks.Any(s => s.CompanyName.ToLower() == stockModel.CompanyName.ToLower()))
            {
                throw new System.Exception($"Ya existe un stock con el nombre de compañía '{stockModel.CompanyName}'");
            }           
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

            // VALIDACIÓN: Verificar si otro stock diferente tiene el mismo symbol
            var duplicateSymbol = _stocks
                .FirstOrDefault(s => s.Symbol.ToLower() == stockDto.Symbol.ToLower() && s.Id != id);

            if (duplicateSymbol != null)
            {
                throw new System.Exception($"Ya existe otro stock con el symbol '{stockDto.Symbol}' (ID: {duplicateSymbol.Id})");
            }

            // VALIDACIÓN: Verificar si otro stock diferente tiene el mismo nombre de compañía
            var duplicateCompanyName = _stocks
                .FirstOrDefault(s => s.CompanyName.ToLower() == stockDto.CompanyName.ToLower() && s.Id != id);

            if (duplicateCompanyName != null)
            {
                throw new System.Exception($"Ya existe otro stock con el nombre de compañía '{stockDto.CompanyName}' (ID: {duplicateCompanyName.Id})");
            }

            // Actualizar propiedades
            existingStock.Symbol = stockDto.Symbol;
            existingStock.CompanyName = stockDto.CompanyName;
            existingStock.Purchase = stockDto.Purchase;
            existingStock.LastDiv = stockDto.LastDiv;
            existingStock.Industry = stockDto.Industry;
            existingStock.MarketCap = stockDto.MarketCap;
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
        
    public Task<bool> SymbolExists(string symbol, int? excludeId = null)
    {
    return Task.FromResult(_stocks
        .Any(s => s.Symbol.ToLower() == symbol.ToLower() &&
        (excludeId == null || s.Id != excludeId.Value)));
    }
    public Task<bool> CompanyNameExists(string companyName, int? excludeId = null)
        {
            return Task.FromResult(_stocks
                .Any(s => s.CompanyName.ToLower() == companyName.ToLower() &&
                (excludeId == null || s.Id != excludeId.Value)));
        }
    }    
}