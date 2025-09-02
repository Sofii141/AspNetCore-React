using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class InMemoryPortfolioRepository : IPortfolioRepository
    {
        private static readonly List<Portfolio> _portfolios = new List<Portfolio>();

        public Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            // Comprobamos si la relación ya existe para evitar duplicados.
            var exists = _portfolios.Any(p => p.AppUserId == portfolio.AppUserId && p.StockId == portfolio.StockId);
            if (!exists)
            {
                _portfolios.Add(portfolio);
            }
            return Task.FromResult(portfolio);
        }

        public Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            var userStockIds = _portfolios
                .Where(p => p.AppUserId == user.Id)
                .Select(p => p.StockId)
                .ToList();

            // La lista pública del otro repositorio
            var stocks = InMemoryStockRepository._stocks
                .Where(s => userStockIds.Contains(s.Id))
                .ToList();

            return Task.FromResult(stocks);
        }

        public Task<Portfolio?> DeletePortfolio(AppUser appUser, string symbol)
        {
            // Lista pública del otro repositorio
            var stock = InMemoryStockRepository._stocks.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower());
            if (stock == null)
            {
                return Task.FromResult<Portfolio?>(null);
            }

            var portfolioEntry = _portfolios.FirstOrDefault(p => p.AppUserId == appUser.Id && p.StockId == stock.Id);

            if (portfolioEntry != null)
            {
                _portfolios.Remove(portfolioEntry);
            }

            return Task.FromResult(portfolioEntry);
        }
    }
}