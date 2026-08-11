using Microsoft.EntityFrameworkCore;
using InterviewProjectTemplate.Models;

namespace InterviewProjectTemplate.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<MoodEntry> MoodEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Enforces that an IP address can only log one entry per distinct calendar date
            modelBuilder.Entity<MoodEntry>()
                .HasIndex(m => new { m.IpAddress, m.LogDate })
                .IsUnique();
        }
    }
}
