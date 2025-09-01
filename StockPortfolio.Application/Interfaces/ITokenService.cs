using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StockPortfolio.Domain.Entities;
using StockPortfolio.Application.Dtos.Stock;

namespace StockPortfolio.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}