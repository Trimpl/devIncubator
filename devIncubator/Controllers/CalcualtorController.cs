using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using devIncubator.Data;
using devIncubator.Models;

namespace devIncubator.Controllers
{
    [ApiController]
    [Route("calculate")]
    public class CalculatorController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly ILogger<CalculatorController> _logger;
        public CalculatorController(ILogger<CalculatorController> logger,
        ApplicationContext context)
        {
            _context = context;
            _logger = logger;
        }
        public class Points
        {
            public double x { get; set; }
            public double y { get; set; }
        }
        [HttpGet]
        public async Task<List<Points>> Get(double k, double b, double c, double fromX, double toX, double step)
        {
            if (k == 0) return new List<Points>();
            List<Points> response = new List<Points>();
            UserData user = new UserData
            {
                RangeFrom = (int)fromX,
                RangeTo = (int)toX,
                step = (int)step,
                a = (int)k,
                b = (int)b,
                c = (int)c
            };
            await _context.UserData.AddAsync(user);
            _context.SaveChanges();
            int id = user.UserDataId;
            for (double i = fromX; i < -b / (2 * k); i += 1)
            {
                response.Add(new Points
                {
                    x = i,
                    y = k * i * i + b * i + c
                });
                await _context.Point.AddAsync(new Point
                {
                    ChartId = id,
                    PointX = (int)i,
                    PointY = (int)(k * i * i + b * i + c)
                });
            }
            response.Add(new Points
            {
                x = -b / (2 * k),
                y = -((b * b - 4 * k * c) / (4 * k))
            });
            await _context.Point.AddAsync(new Point
            {
                ChartId = id,
                PointX = (int)(-b / (2 * k)),
                PointY = (int)(-((b * b - 4 * k * c) / (4 * k)))
            });
            for (double i = -b / (2 * k) + 1; i < toX; i += 1)
            {
                response.Add(new Points
                {
                    x = i,
                    y = k * i * i + b * i + c
                });
                await _context.Point.AddAsync(new Point
                {
                    ChartId = id,
                    PointX = (int)i,
                    PointY = (int)(k * i * i + b * i + c)
                });
            }
            response.Add(new Points
            {
                x = toX,
                y = k * toX * toX + b * toX + c
            });
            await _context.Point.AddAsync(new Point
            {
                ChartId = id,
                PointX = (int)toX,
                PointY = (int)(k * toX * toX + b * toX + c)
            });
            await _context.SaveChangesAsync();
            return response;
        }
    }
}
