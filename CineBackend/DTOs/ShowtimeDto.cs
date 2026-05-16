namespace CineBackend.DTOs;

public class ShowtimeDto
{
    public DateTime ShowDate { get; set; }

    public string ShowTime { get; set; } = "";

    public decimal Price { get; set; }

    public int MovieId { get; set; }
}