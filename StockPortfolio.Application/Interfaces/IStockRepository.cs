using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Application.Helpers;
using StockPortfolio.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StockPortfolio.Application.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock?> GetBySymbolAsync(string symbol);
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto);
        Task<Stock?> DeleteAsync(int id);
        Task<bool> StockExists(int id);
        Task<bool> CompanyNameExists(string companyName, int? excludeId = null);
    }
}