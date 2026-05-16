using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CineBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddShowtimeModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Showtimes",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Showtimes");
        }
    }
}
