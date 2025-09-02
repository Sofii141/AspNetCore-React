using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StockPortfolio.Application.Dtos.Comment;

namespace StockPortfolio.Application.Dtos.Stock
{
    public class StockDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public decimal Purchase { get; set; } // Representa el precio
        public decimal LastDiv { get; set; }
        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
        public string Sector { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Dcf { get; set; }
        public List<CommentDto> Comments { get; set; }
    }
}