using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq; // Necesario para .Select

namespace StockPortfolio.Infrastructure.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _config = config;
            var signingKey = _config["JWT:SigningKey"];
            if (string.IsNullOrEmpty(signingKey))
            {
                throw new ArgumentNullException("JWT:SigningKey not configured in appsettings.json");
            }
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        }

        // --- ¡CAMBIO 1: El método ahora acepta una lista de roles! ---
        public string CreateToken(AppUser user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            // --- ¡CAMBIO 2: Añadimos los roles del usuario al token! ---
            // Esto permite que el frontend sepa qué tipo de usuario es.
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Mantenemos el método original por si se llama desde otro sitio sin roles.
        // Aunque lo ideal sería refactorizar para usar siempre el de arriba.
        public string CreateToken(AppUser user)
        {
            return CreateToken(user, new List<string>());
        }
    }
}