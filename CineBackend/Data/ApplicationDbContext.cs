using Microsoft.EntityFrameworkCore;

using CineBackend.Models;

namespace CineBackend.Data;

public class ApplicationDbContext
    : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options
    ) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Movie> Movies => Set<Movie>();

    public DbSet<Showtime> Showtimes => Set<Showtime>();

    public DbSet<Booking> Bookings => Set<Booking>();

    public DbSet<TicketDetail> TicketDetails => Set<TicketDetail>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder
    )
    {
        modelBuilder.Entity<TicketDetail>()
            .HasIndex(t => new
            {
                t.ShowtimeId,
                t.RowNumber,
                t.SeatNumber
            })
            .IsUnique();
    }
}