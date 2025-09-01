using System;
using System.Net.Http;
using System.Threading.Tasks;
using StockPortfolio.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Infrastructure.Service
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                // Construimos la nueva URL para Alpha Vantage
                var apiKey = _config["FMPKey"]; // Todavía usamos la misma entrada en appsettings.json
                var url = $"https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={apiKey}";

                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    // Usamos 'dynamic' para no tener que crear una clase DTO para la respuesta
                    var stockData = JsonConvert.DeserializeObject<dynamic>(content);

                    // Alpha Vantage devuelve un objeto vacío si no encuentra el símbolo
                    if (stockData["Symbol"] == null)
                    {
                        return null;
                    }

                    // Mapeamos los datos de Alpha Vantage a nuestro modelo de Stock
                    var stock = new Stock
                    {
                        Symbol = stockData.Symbol,
                        CompanyName = stockData.Name,
                        Industry = stockData.Industry,
                        MarketCap = long.Parse((string)stockData.MarketCapitalization),
                        // Nota: La API de Overview no siempre da el precio y dividendo de la misma forma que FMP.
                        // Usamos valores seguros o los que sí están disponibles.
                        Purchase = decimal.TryParse((string)stockData.PERatio, out var pe) ? pe : 0, // Usamos PERatio como ejemplo
                        LastDiv = decimal.TryParse((string)stockData.DividendPerShare, out var div) ? div : 0
                    };

                    return stock;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}