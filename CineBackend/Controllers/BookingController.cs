using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

using CineBackend.Data;
using CineBackend.DTOs;
using CineBackend.Models;

namespace CineBackend.Controllers;

[ApiController]
[Route("api/booking")]
public class BookingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BookingController(ApplicationDbContext context)
    {
        _context = context;
    }


    // =========================
    // CREATE BOOKING
    // =========================
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] BookingDto dto)
    {
        if (dto == null || dto.Seats == null || dto.Seats.Count == 0)
        {
            return BadRequest(new { message = "Invalid booking request" });
        }

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // 🔐 GET USER ID FROM JWT
            var userIdClaim =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
                User.FindFirst("userId")?.Value;

            if (userIdClaim == null)
                return Unauthorized(new { message = "Invalid token" });

            var userId = int.Parse(userIdClaim);

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return BadRequest(new { message = "User not found" });

            // 💰 CALCULATE PRICE
            decimal totalAmount = dto.Seats.Sum(seat =>
                (seat.RowNumber == "G" || seat.RowNumber == "H") ? 300 : 200
            );

            // 💳 CHECK BALANCE
            if (user.CreditBalance < totalAmount)
                return BadRequest(new { message = "Insufficient balance" });

            // 🔒 CHECK SEAT AVAILABILITY
            foreach (var seat in dto.Seats)
            {
                var alreadyBooked = await _context.TicketDetails.AnyAsync(t =>
                    t.ShowtimeId == dto.ShowtimeId &&
                    t.RowNumber == seat.RowNumber &&
                    t.SeatNumber == seat.SeatNumber
                );

                if (alreadyBooked)
                {
                    return BadRequest(new
                    {
                        message = $"Seat {seat.RowNumber}-{seat.SeatNumber} already booked"
                    });
                }
            }

            // 💸 DEDUCT BALANCE
            user.CreditBalance -= totalAmount;

            // 🎟 CREATE BOOKING
            var booking = new Booking
            {
                BookingReference = Guid.NewGuid().ToString("N")[..8].ToUpper(),
                TotalAmount = totalAmount,
                UserId = userId,
                BookingDate = DateTime.Now
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // 🎫 ADD TICKETS
            foreach (var seat in dto.Seats)
            {
                _context.TicketDetails.Add(new TicketDetail
                {
                    ShowtimeId = dto.ShowtimeId,
                    BookingId = booking.Id,
                    RowNumber = seat.RowNumber,
                    SeatNumber = seat.SeatNumber,
                    Price = (seat.RowNumber == "G" || seat.RowNumber == "H") ? 300 : 200
                });
            }

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new
            {
                message = "Booking Successful",
                bookingReference = booking.BookingReference,
                totalAmount
            });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();

            return StatusCode(500, new
            {
                message = "Booking Failed",
                error = ex.Message
            });
        }
    }

    // =========================
    // GET MY BOOKINGS
    // =========================
    [Authorize]
    [HttpGet("my-bookings")]
    public async Task<IActionResult> MyBookings()
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
            User.FindFirst("userId")?.Value;

        if (userIdClaim == null)
            return Unauthorized((new { message = "Invalid token - user not found" }));

        var userId = int.Parse(userIdClaim);

        var bookings = await _context.Bookings
            .Where(b => b.UserId == userId)
            .Select(b => new
            {
                b.Id,
                b.BookingReference,
                b.TotalAmount,
                b.BookingDate,
                Seats = _context.TicketDetails
                    .Where(t => t.BookingId == b.Id)
                    .Select(t => new
                    {
                        t.RowNumber,
                        t.SeatNumber
                    }).ToList()
            })
            .OrderByDescending(b => b.BookingDate)
            .ToListAsync();

        return Ok(bookings);
    }

    // =========================
    // GET BOOKED SEATS
    // =========================
    [HttpGet("booked-seats/{showtimeId}")]
    public async Task<IActionResult> GetBookedSeats(int showtimeId)
    {
        var seats = await _context.TicketDetails
            .Where(t => t.ShowtimeId == showtimeId)
            .Select(t => new
            {
                t.RowNumber,
                t.SeatNumber
            })
            .ToListAsync();

        return Ok(seats);
    }
}