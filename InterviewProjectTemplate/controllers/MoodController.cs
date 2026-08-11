using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InterviewProjectTemplate.Data;
using InterviewProjectTemplate.Models;

namespace InterviewProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoodController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoodController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddMood([FromBody] MoodEntryDto dto)
        {
            // Extracts IP safely through container networks and standard reverse proxies
            string userIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            if (HttpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                userIp = HttpContext.Request.Headers["X-Forwarded-For"].ToString().Split(',')[0].Trim();
            }

            DateTime today = DateTime.UtcNow.Date;

            bool alreadyTracked = await _context.MoodEntries
                .AnyAsync(m => m.IpAddress == userIp && m.LogDate == today);

            if (alreadyTracked)
            {
                return BadRequest(new { message = "You have already tracked your mood today! Please come back tomorrow." });
            }

            var entry = new MoodEntry
            {
                IpAddress = userIp,
                LogDate = today,
                Mood = dto.Mood,
                Note = dto.Note,
                CreatedAt = DateTime.UtcNow
            };

            _context.MoodEntries.Add(entry);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Mood recorded successfully!" });
        }

        [HttpGet("admin-logs")]
        public async Task<IActionResult> GetAdminLogs()
        {
            var logs = await _context.MoodEntries
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();
            return Ok(logs);
        }
    }
}
