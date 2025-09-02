using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class InMemoryPortfolioRepository : IPortfolioRepository
    {
        // Esta lista simula la tabla de unión entre Usuarios y Acciones.
        private static readonly List<Portfolio> _portfolios = new List<Portfolio>();

        // Necesitamos una referencia a la lista de acciones disponibles para buscar sus detalles.
        // Copiamos la lista de InMemoryStockRepository para que este repositorio sea autocontenido.
        private static readonly List<Stock> _availableStocks = new List<Stock>
        {
            new Stock { Id = 1, Symbol = "TSLA", CompanyName = "Tesla Inc.", Purchase = 180.00m, Industry = "Automotive", MarketCap = 580000000000 },
            new Stock { Id = 2, Symbol = "AAPL", CompanyName = "Apple Inc.", Purchase = 170.50m, Industry = "Technology", MarketCap = 2600000000000 },
            new Stock { Id = 3, Symbol = "GOOGL", CompanyName = "Alphabet Inc.", Purchase = 140.20m, Industry = "Technology", MarketCap = 1700000000000 }
        };

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
            // 1. Encontrar los StockId's para este usuario en nuestra lista de portfolios.
            var userStockIds = _portfolios
                .Where(p => p.AppUserId == user.Id)
                .Select(p => p.StockId)
                .ToList();

            // 2. Usar esos Ids para buscar los detalles completos en nuestra lista de acciones disponibles.
            var stocks = _availableStocks
                .Where(s => userStockIds.Contains(s.Id))
                .ToList();

            return Task.FromResult(stocks);
        }

        public Task<Portfolio?> DeletePortfolio(AppUser appUser, string symbol)
        {
            // 1. Encontrar la acción para obtener su Id.
            var stock = _availableStocks.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower());
            if (stock == null)
            {
                return Task.FromResult<Portfolio?>(null);
            }

            // 2. Encontrar la entrada del portafolio que coincida con el UserId y el StockId.
            var portfolioEntry = _portfolios.FirstOrDefault(p => p.AppUserId == appUser.Id && p.StockId == stock.Id);

            if (portfolioEntry != null)
            {
                _portfolios.Remove(portfolioEntry);
            }

            return Task.FromResult(portfolioEntry);
        }
    }
}