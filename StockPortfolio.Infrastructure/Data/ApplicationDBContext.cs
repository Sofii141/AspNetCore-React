using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Infrastructure.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        public DbSet<Stock> Stocks { get; set; } = null!;
        public DbSet<Comment> Comments { get; set; } = null!;
        public DbSet<Portfolio> Portfolios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Stock>(entity => {
                entity.Property(e => e.Purchase).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.LastDiv).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.Dcf).HasColumnType("decimal(18, 2)");
            });

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" },
            };
            builder.Entity<IdentityRole>().HasData(roles);

            // --- ¡AQUÍ ESTÁ LA SOLUCIÓN! ---
            // Le decimos a Entity Framework que, al crear la base de datos,
            // inserte estas filas en la tabla 'Stocks'.
            builder.Entity<Stock>().HasData(
                new Stock
                {
                    Id = 1,
                    Symbol = "TSLA",
                    CompanyName = "Tesla Inc.",
                    Purchase = 180.00m,
                    LastDiv = 0,
                    Industry = "Automotive",
                    MarketCap = 580000000000,
                    Sector = "Automotive",
                    Dcf = 175.50m,
                    Description = "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally."
                },
                new Stock
                {
                    Id = 2,
                    Symbol = "AAPL",
                    CompanyName = "Apple Inc.",
                    Purchase = 170.50m,
                    LastDiv = 0.92m,
                    Industry = "Technology",
                    MarketCap = 2600000000000,
                    Sector = "Technology",
                    Dcf = 165.00m,
                    Description = "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide."
                },
                new Stock
                {
                    Id = 3,
                    Symbol = "GOOGL",
                    CompanyName = "Alphabet Inc.",
                    Purchase = 140.20m,
                    LastDiv = 0,
                    Industry = "Technology",
                    MarketCap = 1700000000000,
                    Sector = "Technology",
                    Dcf = 150.00m,
                    Description = "Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America."
                }
            );
        }
    }
}