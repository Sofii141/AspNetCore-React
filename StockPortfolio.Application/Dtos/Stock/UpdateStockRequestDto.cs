// Ruta: StockPortfolio.Application/Dtos/Stock/UpdateStockRequestDto.cs (CORREGIDO)

using System.ComponentModel.DataAnnotations;

namespace StockPortfolio.Application.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters")]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [MaxLength(100, ErrorMessage = "Company Name cannot be over 100 characters")] // AUMENTADO
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [Range(0, 1000000000)] // Rango corregido para incluir 0
        public decimal Purchase { get; set; }

        [Required]
        [Range(0, 100)] // Rango corregido para incluir 0
        public decimal LastDiv { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Industry cannot be over 50 characters")] // AUMENTADO
        public string Industry { get; set; } = string.Empty;

        [Range(0, 5000000000000)] // Rango corregido para incluir 0
        public long MarketCap { get; set; }

       
        [Required]
        [MaxLength(50, ErrorMessage = "Sector cannot be over 50 characters")]
        public string Sector { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0, 1000000000)] // Rango corregido para incluir 0
        public decimal Dcf { get; set; }
    }
}