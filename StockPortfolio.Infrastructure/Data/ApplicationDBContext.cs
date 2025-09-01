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

            // --- ¡ESTA ES LA PARTE IMPORTANTE AÑADIDA! ---
            // Aquí le decimos a Entity Framework cómo crear las columnas 'decimal' en SQL Server.
            // Esto evita las advertencias amarillas y la posible pérdida de datos.
            builder.Entity<Stock>(entity => {
                entity.Property(e => e.Purchase).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.LastDiv).HasColumnType("decimal(18, 2)");
            });
            // --- FIN DE LA PARTE AÑADIDA ---

            // Configuración para la tabla de relación Portfolio (muchos a muchos)
            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Portfolio>()
                .HasOne(u => u.Stock)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(p => p.StockId);

            // Código para crear los roles "Admin" y "User" por defecto en la base de datos
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "User", NormalizedName = "USER" },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}