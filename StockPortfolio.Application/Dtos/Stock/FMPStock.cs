using Newtonsoft.Json; // ¡Asegúrate de tener este using!

namespace StockPortfolio.Application.Dtos.Stock
{
    public class FMPStock
    {
        // Propiedad corregida a PascalCase
        // El atributo le dice a Newtonsoft que busque "symbol" en el JSON
        [JsonProperty("symbol")]
        public string Symbol { get; set; } = string.Empty;

        [JsonProperty("price")]
        public double Price { get; set; }

        [JsonProperty("beta")]
        public double Beta { get; set; }

        [JsonProperty("volAvg")]
        public int VolAvg { get; set; }

        [JsonProperty("mktCap")]
        public long MktCap { get; set; }

        [JsonProperty("lastDiv")]
        public double LastDiv { get; set; }

        [JsonProperty("range")]
        public string Range { get; set; } = string.Empty;

        [JsonProperty("changes")]
        public double Changes { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; } = string.Empty;

        [JsonProperty("currency")]
        public string Currency { get; set; } = string.Empty;

        [JsonProperty("cik")]
        public string Cik { get; set; } = string.Empty;

        [JsonProperty("isin")]
        public string Isin { get; set; } = string.Empty;

        [JsonProperty("cusip")]
        public string Cusip { get; set; } = string.Empty;

        [JsonProperty("exchange")]
        public string Exchange { get; set; } = string.Empty;

        [JsonProperty("exchangeShortName")]
        public string ExchangeShortName { get; set; } = string.Empty;

        [JsonProperty("industry")]
        public string Industry { get; set; } = string.Empty;

        [JsonProperty("website")]
        public string Website { get; set; } = string.Empty;

        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("ceo")]
        public string Ceo { get; set; } = string.Empty;

        [JsonProperty("sector")]
        public string Sector { get; set; } = string.Empty;

        [JsonProperty("country")]
        public string Country { get; set; } = string.Empty;

        [JsonProperty("fullTimeEmployees")]
        public string FullTimeEmployees { get; set; } = string.Empty;

        [JsonProperty("phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonProperty("address")]
        public string Address { get; set; } = string.Empty;

        [JsonProperty("city")]
        public string City { get; set; } = string.Empty;

        [JsonProperty("state")]
        public string State { get; set; } = string.Empty;

        [JsonProperty("zip")]
        public string Zip { get; set; } = string.Empty;

        [JsonProperty("dcfDiff")]
        public double DcfDiff { get; set; }

        [JsonProperty("dcf")]
        public double Dcf { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; } = string.Empty;

        [JsonProperty("ipoDate")]
        public string IpoDate { get; set; } = string.Empty;

        [JsonProperty("defaultImage")]
        public bool DefaultImage { get; set; }

        [JsonProperty("isEtf")]
        public bool IsEtf { get; set; }

        [JsonProperty("isActivelyTrading")]
        public bool IsActivelyTrading { get; set; }

        [JsonProperty("isAdr")]
        public bool IsAdr { get; set; }

        [JsonProperty("isFund")]
        public bool IsFund { get; set; }
    }
}