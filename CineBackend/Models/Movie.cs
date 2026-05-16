using System.Text.Json.Serialization;

namespace CineBackend.Models;

public class Movie
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string Duration { get; set; } = "";

    public string Language { get; set; } = "";

    public string Poster { get; set; } = "";

    public List<Showtime>? Showtimes { get; set; }
}