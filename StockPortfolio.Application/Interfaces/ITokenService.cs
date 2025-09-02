// EN: StockPortfolio.Application/Interfaces/ITokenService.cs (CORREGIDO)

using System.Collections.Generic; // ¡Añade este using!
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);

        // --- ¡AÑADE ESTA LÍNEA! ---
        // Esto le dice a toda la aplicación que existe un método CreateToken
        // que acepta un usuario Y una lista de roles.
        string CreateToken(AppUser user, IList<string> roles);
    }
}