using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;

using Microsoft.EntityFrameworkCore;

using CineBackend.Data;

using CineBackend.Models;

namespace CineBackend.Controllers;

[ApiController]

[Route("api/[controller]")]

public class MovieController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MovieController(
        ApplicationDbContext context
    )
    {
        _context = context;
    }

    [HttpGet]

    public async Task<IActionResult> GetMovies()
    {
        var movies =
            await _context.Movies.ToListAsync();

        return Ok(movies);
    }

    [Authorize(Roles = "Admin")]

    [HttpPost]

    public async Task<IActionResult> AddMovie(
        Movie movie
    )
    {
        _context.Movies.Add(movie);

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                message =
                    "Movie Added Successfully"
            }
        );
    }
}