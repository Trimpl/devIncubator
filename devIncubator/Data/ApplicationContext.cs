using devIncubator.Models;
using Microsoft.EntityFrameworkCore;

namespace devIncubator.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Point> Point { get; set; }
        public DbSet<UserData> UserData { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=devIncubator;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}
