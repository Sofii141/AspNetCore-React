// Ruta: StockPortfolio.Infrastructure/Repositories/StockRepository.cs (CORREGIDO)

using Microsoft.EntityFrameworkCore;
using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Application.Helpers;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using StockPortfolio.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (stockModel == null) return null;

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            // Lógica mejorada para filtrar (puedes expandir esto más adelante).
            var stocks = _context.Stocks.Include(c => c.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));

            if (!string.IsNullOrWhiteSpace(query.Symbol))
                stocks = stocks.Where(s => s.Symbol == query.Symbol);

            return await stocks.ToListAsync();
        }

        public Task<Stock?> GetByIdAsync(int id) => _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        public Task<Stock?> GetBySymbolAsync(string symbol) => _context.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
        public Task<bool> StockExists(int id) => _context.Stocks.AnyAsync(s => s.Id == id);

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null) return null;

            existingStock.Symbol = stockDto.Symbol;
            existingStock.CompanyName = stockDto.CompanyName;
            existingStock.Purchase = stockDto.Purchase;
            existingStock.LastDiv = stockDto.LastDiv;
            existingStock.Industry = stockDto.Industry;
            existingStock.MarketCap = stockDto.MarketCap;

            // --- ¡CORRECCIÓN CLAVE! ---
            // Le decimos a Entity Framework que también actualice estos campos.
            existingStock.Sector = stockDto.Sector;
            existingStock.Description = stockDto.Description;
            existingStock.Dcf = stockDto.Dcf;

            await _context.SaveChangesAsync();
            return existingStock;
        }
    }
}