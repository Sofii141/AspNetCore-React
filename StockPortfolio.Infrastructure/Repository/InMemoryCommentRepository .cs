using StockPortfolio.Application.Helpers;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class InMemoryCommentRepository : ICommentRepository
    {
        private static readonly List<Comment> _comments = new List<Comment>
        {
            new Comment { Id = 1, StockId = 1, Title = "¡A la luna!", Content = "Tesla es el futuro, sin duda.", CreatedOn = DateTime.Now.AddDays(-5) },
            new Comment { Id = 2, StockId = 1, Title = "Mucha volatilidad", Content = "Hay que tener cuidado, sube y baja mucho.", CreatedOn = DateTime.Now.AddDays(-2) },
            new Comment { Id = 3, StockId = 2, Title = "Inversión segura", Content = "Apple nunca falla, siempre sólida.", CreatedOn = DateTime.Now.AddDays(-10) }
        };

        public Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
        {
            return Task.FromResult(_comments);
        }

        public Task<Comment?> GetByIdAsync(int id)
        {
            return Task.FromResult(_comments.FirstOrDefault(c => c.Id == id));
        }

        public Task<Comment> CreateAsync(Comment commentModel)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            throw new NotImplementedException();
        }
    }
}