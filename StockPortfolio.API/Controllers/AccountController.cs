using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StockPortfolio.Application.Dtos;
using StockPortfolio.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockPortfolio.Domain.Entities;
using StockPortfolio.Application.Dtos.Account; // DTOs ahora están en Application

namespace StockPortfolio.API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            // --- NUESTRO PRIMER ESPÍA ---
            Console.WriteLine("*************************************");
            Console.WriteLine("***** ENTRÓ AL MÉTODO DE REGISTRO *****");
            Console.WriteLine("*************************************");

            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("!!!!! ERROR: El modelo no es válido (ModelState)");
                    return BadRequest(ModelState);
                }

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                // --- Punto crítico 1: Creación del usuario ---
                Console.WriteLine("Intentando crear el usuario en la base de datos...");
                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    // --- Punto crítico 2: Asignación de rol ---
                    Console.WriteLine("Usuario creado con éxito. Intentando asignar rol 'User'...");
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        Console.WriteLine("Rol asignado con éxito. Creando token...");
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        Console.WriteLine("!!!!! ERROR: Falló la asignación de rol.");
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    Console.WriteLine("!!!!! ERROR: Falló la creación del usuario.");
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                // --- NUESTRO SEGUNDO ESPÍA ---
                Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                Console.WriteLine("!!!!!!!!!! ERROR CAPTURADO EN CATCH !!!!!!!!!!");
                Console.WriteLine(e.ToString()); // Imprime el error completo
                Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return StatusCode(500, e.ToString());
            }
        }


    }
}