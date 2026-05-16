using System.Text.Json.Serialization;

namespace CineBackend.Models;

public class TicketDetail
{
    public int Id { get; set; }

    public int ShowtimeId { get; set; }

    public int BookingId { get; set; }

    public string RowNumber { get; set; } = "";

    public int SeatNumber { get; set; }

    public decimal Price { get; set; }

    [JsonIgnore]

    public Booking? Booking { get; set; }

    [JsonIgnore]

    public Showtime? Showtime { get; set; }
}