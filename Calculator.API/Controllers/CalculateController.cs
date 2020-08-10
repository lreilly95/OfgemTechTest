using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Calculator.API.Data;
using Calculator.API.Logic;
using Calculator.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculateController : ControllerBase
    {
        private readonly IRequestRepository _repo;
        private readonly ICalculatorService _calc;
        private readonly IHttpContextAccessor _accessor;
        public CalculateController(IRequestRepository repo, ICalculatorService calc, IHttpContextAccessor accessor)
        {
            _repo = repo;
            _calc = calc;
            _accessor = accessor;
        }
        // GET /api/calculate/"calculation"
        [HttpGet("{calculation}")]
        public async Task<IActionResult> solveCalculation(string calculation)
        {
            var request = new Request();
            request.IpAddress = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
            request.RequestDateTime = DateTime.Now;
            _repo.Add(request);
            await _repo.SaveAll();
            try
            {
                var result = await _calc.evaluatePostfix(calculation);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                throw new Exception("Error with calculation: " + ex.Message);
            }           
        }

    }
}