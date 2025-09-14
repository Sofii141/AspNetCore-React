# AspNetCore-React
Migraciones:

Opcion A:
Add-Migration InitialCreate 

Update-Database 

Opcion B: 
Add-Migration InitialCreate -Project StockPortfolio.Infrastructure -StartupProject StockPortfolio.API

Update-Database -Project StockPortfolio.Infrastructure -StartupProject StockPortfolio.API
