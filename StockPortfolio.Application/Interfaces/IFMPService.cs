using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StockPortfolio.Application.Dtos.Stock;
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Application.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}