using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockPortfolio.Application.Interfaces;
using StockPortfolio.Domain.Entities;

namespace StockPortfolio.API.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;
        private readonly IPortfolioRepository _portfolioRepo;

        public PortfolioController(UserManager<AppUser> userManager,
                                 IStockRepository stockRepo,
                                 IPortfolioRepository portfolioRepo)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            // --- CORRECCIÓN 1: Forma segura de obtener el usuario ---
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null)
            {
                return Unauthorized("User not found.");
            }

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            // --- CORRECCIÓN 2: La misma forma segura para añadir ---
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null)
            {
                return Unauthorized("User not found.");
            }

            var stock = await _stockRepo.GetBySymbolAsync(symbol);

            if (stock == null)
            {
                return BadRequest("Stock not found");
            }

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            // Esta comprobación ahora es 100% segura
            if (userPortfolio.Any(e => e.Symbol.ToLower() == symbol.ToLower()))
            {
                return BadRequest("Cannot add same stock to portfolio");
            }

            var portfolioModel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appUser.Id
            };

            await _portfolioRepo.CreateAsync(portfolioModel);

            if (portfolioModel == null)
            {
                return StatusCode(500, "Could not create");
            }

            return Created(); // Created es correcto para un POST exitoso.
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            // --- CORRECCIÓN 3: Y también para eliminar ---
            var appUser = await _userManager.GetUserAsync(User);
            if (appUser == null)
            {
                return Unauthorized("User not found.");
            }

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            // Buscamos si la acción está en el portafolio del usuario
            var filteredStock = userPortfolio.FirstOrDefault(s => s.Symbol.ToLower() == symbol.ToLower());

            if (filteredStock != null)
            {
                // Si la encontramos, procedemos a borrar
                await _portfolioRepo.DeletePortfolio(appUser, symbol);
            }
            else
            {
                // Si no, devolvemos un error claro
                return BadRequest("Stock not in your portfolio");
            }

            return Ok(); // Devolvemos Ok si la eliminación fue exitosa
        }
    }
}