using Calculator.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Calculator.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Request> Requests { get; set; }
    }
}