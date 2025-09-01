using Microsoft.EntityFrameworkCore;
using StockPortfolio.Application.Helpers;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using StockPortfolio.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        // --- ¡ESTE ES EL MÉTODO CORREGIDO! ---
        public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
        {
            // Empezamos con todos los comentarios que incluyen la información del usuario
            var comments = _context.Comments.Include(a => a.AppUser).AsQueryable();

            // Si se proporciona un símbolo en la consulta, filtramos por él.
            if (!string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                // Buscamos comentarios cuyo Stock asociado tenga el símbolo solicitado.
                comments = comments.Where(s => s.Stock != null && s.Stock.Symbol == queryObject.Symbol);
            }

            // Aplicamos el ordenamiento
            if (queryObject.IsDecsending)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }

            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = await _context.Comments.FindAsync(id);
            if (existingComment == null) return null;

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();
            return existingComment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentModel = await _context.Comments.FindAsync(id);
            if (commentModel == null) return null;
            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }
    }
}