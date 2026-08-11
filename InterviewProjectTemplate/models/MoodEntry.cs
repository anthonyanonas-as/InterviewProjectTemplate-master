using System;
using System.ComponentModel.DataAnnotations;

namespace InterviewProjectTemplate.Models
{
    public class MoodEntry
    {
        [Key]
        public int Id { get; set; }
        public string IpAddress { get; set; } = string.Empty;
        public DateTime LogDate { get; set; } 
        [Required]
        public string Mood { get; set; } = string.Empty; 
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class MoodEntryDto
    {
        [Required]
        public string Mood { get; set; } = string.Empty;
        public string? Note { get; set; }
    }
}
