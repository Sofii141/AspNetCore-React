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
            new Comment { Id = 1, StockId = 1, AppUserId = "user1", Title = "¡A la luna!", Content = "Tesla es el futuro, sin duda.", CreatedOn = DateTime.Now.AddDays(-5) },
            new Comment { Id = 2, StockId = 1, AppUserId = "user2", Title = "Mucha volatilidad", Content = "Hay que tener cuidado, sube y baja mucho.", CreatedOn = DateTime.Now.AddDays(-2) },
            new Comment { Id = 3, StockId = 2, AppUserId = "user1", Title = "Inversión segura", Content = "Apple nunca falla, siempre sólida.", CreatedOn = DateTime.Now.AddDays(-10) }
        };

        public Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
        {
            // Simula el filtrado que haría la base de datos
            var filteredComments = _comments;
            if (!string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                // Necesitamos saber qué StockId corresponde al Símbolo.
                // En un caso real, consultaríamos la lista de stocks. Aquí lo simulamos:
                int? stockId = queryObject.Symbol.ToUpper() switch
                {
                    "TSLA" => 1,
                    "AAPL" => 2,
                    "GOOGL" => 3,
                    _ => null
                };

                if (stockId.HasValue)
                {
                    filteredComments = _comments.Where(c => c.StockId == stockId.Value).ToList();
                }
            }

            return Task.FromResult(filteredComments);
        }

        public Task<Comment?> GetByIdAsync(int id)
        {
            return Task.FromResult(_comments.FirstOrDefault(c => c.Id == id));
        }

        public Task<Comment> CreateAsync(Comment commentModel)
        {
            // Simulamos un ID autoincremental
            var maxId = _comments.Any() ? _comments.Max(c => c.Id) : 0;
            commentModel.Id = maxId + 1;
            commentModel.CreatedOn = DateTime.Now;
            _comments.Add(commentModel);
            return Task.FromResult(commentModel);
        }

        public Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = _comments.FirstOrDefault(c => c.Id == id);
            if (existingComment == null)
            {
                return Task.FromResult<Comment?>(null);
            }

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            return Task.FromResult<Comment?>(existingComment);
        }

        public Task<Comment?> DeleteAsync(int id)
        {
            var commentToDelete = _comments.FirstOrDefault(c => c.Id == id);
            if (commentToDelete == null)
            {
                return Task.FromResult<Comment?>(null);
            }

            _comments.Remove(commentToDelete);
            return Task.FromResult<Comment?>(commentToDelete);
        }
    }
}