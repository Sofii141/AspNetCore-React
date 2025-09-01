using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using StockPortfolio.Infrastructure.Data;
using StockPortfolio.Infrastructure.Repositories;
using StockPortfolio.Infrastructure.Service;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


// --- REEMPLAZA TU CONFIGURACIÓN DE SWAGGER CON ESTO ---
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "StockPortfolio.API", Version = "1.0" });

    // 1. Definir el esquema de seguridad (Bearer Token JWT)
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    // 2. Añadir el requisito de seguridad que usa el esquema anterior
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// DbContext e Identity se quedan, son necesarios para el login/register
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<AppUser, IdentityRole>(options => { /*...*/ })
.AddEntityFrameworkStores<ApplicationDBContext>();

// Autenticación (sin cambios)
builder.Services.AddAuthentication(options => { /*...*/ }).AddJwtBearer(options => { /*...*/ });

// --- INYECCIÓN DE DEPENDENCIAS PARA DATOS QUEMADOS ---
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();


// Servicios que no dependen de la base de datos
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IFMPService, FMPService>(); // Ahora sí podemos activarlo
builder.Services.AddHttpClient<IFMPService, FMPService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsBuilder => corsBuilder
     .WithOrigins("http://localhost:3000")
     .AllowAnyMethod()
     .AllowAnyHeader()
     .AllowCredentials());

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();