// EN: StockPortfolio.Application/Interfaces/ITokenService.cs (CORREGIDO)

using System.Collections.Generic; // �A�ade este using!
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);

        // --- �A�ADE ESTA L�NEA! ---
        // Esto le dice a toda la aplicaci�n que existe un m�todo CreateToken
        // que acepta un usuario Y una lista de roles.
        string CreateToken(AppUser user, IList<string> roles);
    }
}