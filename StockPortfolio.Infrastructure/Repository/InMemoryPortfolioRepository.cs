using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class InMemoryPortfolioRepository : IPortfolioRepository
    {
        // En un escenario real, esto estaría asociado a un usuario,
        // pero por ahora, podemos simular un portfolio vacío o con datos.
        private static readonly List<Stock> _portfolioStocks = new List<Stock>();

        public Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            throw new System.NotImplementedException();
        }

        public Task<Portfolio?> DeletePortfolio(AppUser appUser, string symbol)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            // Simplemente devolvemos una lista vacía, como si el usuario
            // aún no hubiera añadido nada a su portfolio.
            return Task.FromResult(_portfolioStocks);
        }
    }
}