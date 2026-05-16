namespace CineBackend.Models;

public class Booking
{
    public int Id { get; set; }

    public string BookingReference { get; set; } = "";

    public decimal TotalAmount { get; set; }

    public int UserId { get; set; }

    public User? User { get; set; }

    public DateTime BookingDate { get; set; }

    public List<TicketDetail>? TicketDetails { get; set; }
}