using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineBackend.Data;
using CineBackend.DTOs;
using CineBackend.Models;
using CineBackend.Services;

namespace CineBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(
        ApplicationDbContext context,
        JwtService jwtService
    )
    {
        _context = context;
        _jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (dto == null)
        {
            return BadRequest(new { message = "Invalid request" });
        }

        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (existingUser != null)
        {
            return BadRequest(new
            {
                message = "Email already exists"
            });
        }

        // ✅ ROLE SAFETY (ONLY Admin allowed explicitly)
        var role = dto.Role?.Trim();

        if (role != "Admin")
        {
            role = "User";
        }

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Password = dto.Password, // later replace with hashing
            Role = role,
            CreditBalance = 5000
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Registration Successful",
            role = user.Role
        });
    }

    // =========================
    // LOGIN
    // =========================
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user == null)
            return Unauthorized(new { message = "User not found" });

        if (user.Password != dto.Password)
            return Unauthorized(new { message = "Wrong password" });

        var token = _jwtService.GenerateToken(user);

        return Ok(new
        {
            token,
            role = user.Role,
            userId = user.Id,
            name = user.Name
        });
    }
}