using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineBackend.Data;
using CineBackend.Models;

namespace CineBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShowtimeController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ShowtimeController(ApplicationDbContext context)
    {
        _context = context;
    }

    // ➕ ADD SHOWTIME (ADMIN)
    [HttpPost]
    public async Task<IActionResult> AddShowtime(Showtime showtime)
    {
        _context.Showtimes.Add(showtime);
        await _context.SaveChangesAsync();

        return Ok(showtime);
    }

    // 🎬 GET ALL SHOWTIMES FOR A MOVIE
    [HttpGet("movie/{movieId}")]
    public async Task<IActionResult> GetByMovie(int movieId)
    {
        var data = await _context.Showtimes
            .Where(s => s.MovieId == movieId)
            .ToListAsync();

        return Ok(data);
    }
}