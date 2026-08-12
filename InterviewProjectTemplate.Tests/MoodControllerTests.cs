using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using InterviewProject.Controllers;
using InterviewProjectTemplate.Data;
using InterviewProjectTemplate.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace InterviewProjectTemplate.Tests
{
    public class MoodControllerTests
    {
        private ApplicationDbContext CreateInMemoryContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new ApplicationDbContext(options);
        }

        [Fact]
        public async Task AddMood_NewEntry_ReturnsOk()
        {
            var context = CreateInMemoryContext();
            var httpContext = new DefaultHttpContext();
            httpContext.Connection.RemoteIpAddress = IPAddress.Loopback;

            var controller = new MoodController(context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext
                }
            };

            var dto = new MoodEntryDto { Mood = "Happy", Note = "Testing" };
            var result = await controller.AddMood(dto);

            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Single(context.MoodEntries);
            Assert.Equal("Happy", context.MoodEntries.Single().Mood);
        }

        [Fact]
        public async Task AddMood_DuplicateSameDay_ReturnsBadRequest()
        {
            var context = CreateInMemoryContext();
            context.MoodEntries.Add(new MoodEntry
            {
                IpAddress = "127.0.0.1",
                LogDate = DateTime.UtcNow.Date,
                Mood = "Neutral",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var httpContext = new DefaultHttpContext();
            httpContext.Connection.RemoteIpAddress = IPAddress.Loopback;

            var controller = new MoodController(context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContext
                }
            };

            var dto = new MoodEntryDto { Mood = "Sad", Note = "Still testing" };
            var result = await controller.AddMood(dto);

            var badRequest = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal((int)HttpStatusCode.BadRequest, badRequest.StatusCode);
        }

        [Fact]
        public async Task GetAdminLogs_ReturnsMoodEntriesDescending()
        {
            var context = CreateInMemoryContext();
            context.MoodEntries.Add(new MoodEntry
            {
                IpAddress = "127.0.0.1",
                LogDate = DateTime.UtcNow.Date.AddDays(-1),
                Mood = "Sad",
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            });
            context.MoodEntries.Add(new MoodEntry
            {
                IpAddress = "127.0.0.2",
                LogDate = DateTime.UtcNow.Date,
                Mood = "Happy",
                CreatedAt = DateTime.UtcNow
            });
            await context.SaveChangesAsync();

            var controller = new MoodController(context)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext()
                }
            };

            var result = await controller.GetAdminLogs();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var logs = Assert.IsAssignableFrom<List<MoodEntry>>(okResult.Value);

            Assert.Equal(2, logs.Count);
            Assert.Equal("Happy", logs[0].Mood);
            Assert.Equal("Sad", logs[1].Mood);
        }
    }
}
