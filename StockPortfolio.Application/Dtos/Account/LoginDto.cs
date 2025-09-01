using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StockPortfolio.Application.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; } = string.Empty; // Inicializar a string vacío
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}