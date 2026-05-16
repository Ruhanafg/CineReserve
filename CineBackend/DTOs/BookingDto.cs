namespace CineBackend.DTOs;

public class BookingDto
{
    public int UserId { get; set; }

    public int ShowtimeId { get; set; }

    public List<SeatDto> Seats { get; set; } = new();
}

public class SeatDto
{
    public string RowNumber { get; set; } = "";

    public int SeatNumber { get; set; }
}