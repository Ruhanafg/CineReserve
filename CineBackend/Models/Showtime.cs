namespace CineBackend.Models;

public class Showtime
{
    public int Id { get; set; }

    public DateTime ShowDate { get; set; }

    public string ShowTime { get; set; } = "";

    public decimal Price { get; set; }

    public int MovieId { get; set; }

    public Movie? Movie { get; set; }
}