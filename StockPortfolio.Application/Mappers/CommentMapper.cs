using StockPortfolio.Application.Dtos.Comment;
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Application.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                // --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
                // Si AppUser no fue cargado (es nulo), usamos "Unknown" como valor por defecto.
                // Esto previene el NullReferenceException.
                CreatedBy = commentModel.AppUser?.UserName ?? "Unknown",
                StockId = commentModel.StockId,
                AppUserId = commentModel.AppUserId
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId
            };
        }

        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDto commentDto, int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId
            };
        }
    }
}